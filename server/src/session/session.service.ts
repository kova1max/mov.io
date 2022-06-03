import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

import { SessionCreateParameter } from './parameters/session-create.parameter';
import { SessionFindParameter } from './parameters/session-find.parameter';
import { SessionUpdateParameter } from './parameters/session-update.parameter';
import { SessionDeleteResponse } from './responses/session-delete.response';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  public async create(data: SessionCreateParameter): Promise<Session> {
    const session = new Session();

    session.secret = data.secret;

    try {
      return this.sessionRepository.save(session);
    } catch (e) {
      throw new HttpException(
        'Session create unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(
    filter: SessionFindParameter = {},
    relations: string[] = [],
  ): Promise<Session[]> {
    try {
      return this.sessionRepository.find({ where: filter, relations });
    } catch (e) {
      throw new HttpException(
        'Sessions find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findOneById(
    id: number,
    relations: string[] = [],
  ): Promise<Session | null> {
    try {
      return this.sessionRepository.findOne({
        where: { id },
        relations,
      });
    } catch (e) {
      throw new HttpException(
        'Session find unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async update(
    id: number,
    data: SessionUpdateParameter,
  ): Promise<Session> {
    try {
      return this.sessionRepository.save({ id, ...data });
    } catch (e) {
      throw new HttpException(
        'Session update unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async remove(id: number): Promise<SessionDeleteResponse> {
    try {
      return {
        isSessionDeleted:
          (await this.sessionRepository.delete({ id })).affected === 1,
      };
    } catch (e) {
      throw new HttpException(
        'Session remove unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
