import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserCreateParameter } from './parameters/user-create.parameter';
import { UserFindParameter } from './parameters/user-find.parameter';
import { UserUpdateParameter } from './parameters/user-update.parameter';
import { UserDeleteResponse } from './responses/user-delete.response';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() data: UserCreateParameter): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  public async findAll(@Query() filter: UserFindParameter = {}): Promise<User[]> {
    return this.userService.findAll(
      { ...filter, relations: undefined },
      filter?.relations?.split(','),
    );
  }

  @Get(':id')
  public async findOneByID(
    @Param('id') id: string,
    @Query('relations') relations: string,
  ): Promise<User | null> {
    return this.userService.findOneById(+id, relations?.split(','));
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: UserUpdateParameter,
  ): Promise<User> {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  public async removeById(@Param('id') id: string): Promise<UserDeleteResponse> {
    return this.userService.remove(+id);
  }
}
