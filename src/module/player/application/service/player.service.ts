import { Inject, Injectable } from '@nestjs/common';
import { PlayerRepository } from '../repository/player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @Inject('PLAYER_REPOSITORY') private readonly repository: PlayerRepository,
  ) {}
}
