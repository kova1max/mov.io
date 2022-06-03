import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

import { CreateParameter } from './parameters/create.parameter';
import { FindParameter } from './parameters/find.parameter';
import { UpdateParameter } from './parameters/update.parameter';
import { DeleteResponse } from './responses/delete.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(data: CreateParameter): Promise<User> {
    const user = new User();

    user.fullName = data.fullName;

    try {
      return this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(
        'User create unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(
    filter: FindParameter = {},
    relations: string[] = [],
  ): Promise<User[]> {
    try {
      return this.userRepository.find({ where: filter, relations });
    } catch (e) {
      throw new HttpException(
        'Users find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOneById(
    id: number,
    relations: string[] = [],
  ): Promise<User | null> {
    try {
      return this.userRepository.findOne({
        where: { id },
        relations,
      });
    } catch (e) {
      throw new HttpException(
        'User find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async update(id: number, data: UpdateParameter): Promise<User> {
    try {
      return this.userRepository.save({ id, ...data });
    } catch (e) {
      throw new HttpException(
        'User update unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async remove(id: number): Promise<DeleteResponse> {
    try {
      return {
        isUserDeleted:
          (await this.userRepository.delete({ id })).affected === 1,
      };
    } catch (e) {
      throw new HttpException(
        'User remove unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
