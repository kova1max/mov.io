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
import { SessionCreateParameter } from './parameters/session-create.parameter';
import { SessionFindParameter } from './parameters/session-find.parameter';
import { SessionUpdateParameter } from './parameters/session-update.parameter';
import { SessionDeleteResponse } from './responses/session-delete.response';
import { SessionService } from './session.service';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  public async create(@Body() data: SessionCreateParameter): Promise<Session> {
    return this.sessionService.create(data);
  }

  @Get()
  public async findAll(
    @Query() filter: SessionFindParameter = {},
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
    @Body() data: SessionUpdateParameter,
  ): Promise<Session> {
    return this.sessionService.update(+id, data);
  }

  @Delete(':id')
  public async removeById(@Param('id') id: string): Promise<SessionDeleteResponse> {
    return this.sessionService.remove(+id);
  }
}
