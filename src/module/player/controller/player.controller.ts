import { Body, Controller, Post } from '@nestjs/common';
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
}
