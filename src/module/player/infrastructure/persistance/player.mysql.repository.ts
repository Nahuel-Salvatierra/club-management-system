import { Injectable } from '@nestjs/common';
import { PlayerEntity } from './entities/player.entity';
import { Repository } from 'typeorm';
import { PlayerRepository } from '../../application/repository/player.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerMysqlRepository implements PlayerRepository {
  constructor(
    @InjectRepository(PlayerEntity)
    private repository: Repository<PlayerEntity>,
  ) {}

  async save(player: PlayerEntity): Promise<void> {
    await this.repository.save(player);
  }
}
