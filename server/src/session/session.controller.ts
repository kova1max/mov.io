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
import { Session } from './entities/session.entity';
import { CreateParameter } from './parameters/create.parameter';
import { FindParameter } from './parameters/find.parameter';
import { UpdateParameter } from './parameters/update.parameter';
import { DeleteResponse } from './responses/delete.response';
import { SessionService } from './session.service';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  public async create(@Body() data: CreateParameter): Promise<Session> {
    return this.sessionService.create(data);
  }

  @Get()
  public async findAll(
    @Query() filter: FindParameter = {},
  ): Promise<Session[]> {
    return this.sessionService.findAll(
      { ...filter, relations: undefined },
      filter?.relations?.split(','),
    );
  }

  @Get(':id')
  public async findOneByID(
    @Param('id') id: string,
    @Query('relations') relations: string,
  ): Promise<Session | null> {
    return this.sessionService.findOneById(+id, relations?.split(','));
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateParameter,
  ): Promise<Session> {
    return this.sessionService.update(+id, data);
  }

  @Delete(':id')
  public async removeById(@Param('id') id: string): Promise<DeleteResponse> {
    return this.sessionService.remove(+id);
  }
}
