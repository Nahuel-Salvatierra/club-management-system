import { Controller } from '@nestjs/common';
import { PlayerService } from '../application/service/player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
}
