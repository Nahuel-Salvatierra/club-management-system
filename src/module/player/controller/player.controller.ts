import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerService } from '../application/service/player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from '../domain/player.domain';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return await this.playerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Player> {
    return await this.playerService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Body() updatedPlayerDto: CreatePlayerDto,
    @Param('id') id: string,
  ): Promise<Player> {
    return await this.playerService.update(updatedPlayerDto, +id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playerService.remove(+id);
  }
}
