import { Injectable } from '@nestjs/common';
import { PlayerEntity } from './entities/player.entity';
import { Repository } from 'typeorm';
import { PlayerRepository } from '../../application/repository/player.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../../../common/application/mapper/mapper.service';
import { Player } from '../../domain/player.domain';

@Injectable()
export class PlayerMysqlRepository implements PlayerRepository {
  constructor(
    @InjectRepository(PlayerEntity)
    private repository: Repository<PlayerEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async create(player: Player): Promise<Player> {
    const playerEntity = this.mapperService.classToEntity(player, new Player());
    const createdBookEntity = await this.repository.save(playerEntity);
    return this.mapperService.entityToClass(createdBookEntity, new Player());
  }

  async findById(id: number): Promise<Player> {
    const bookEntity = await this.repository.findOne({
      where: { id },
    });
    return this.mapperService.entityToClass(bookEntity, new Player());
  }
}
