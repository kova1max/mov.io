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
import { CreateParameter } from './parameters/create.parameter';
import { FindParameter } from './parameters/find.parameter';
import { UpdateParameter } from './parameters/update.parameter';
import { DeleteResponse } from './responses/delete.response';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() data: CreateParameter): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  public async findAll(@Query() filter: FindParameter = {}): Promise<User[]> {
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
    @Body() data: UpdateParameter,
  ): Promise<User> {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  public async removeById(@Param('id') id: string): Promise<DeleteResponse> {
    return this.userService.remove(+id);
  }
}
