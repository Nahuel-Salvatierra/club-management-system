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
    const playerEntity = await this.repository.findOne({
      where: { id },
    });
    if (!playerEntity) throw new Error('Player not found');
    return this.mapperService.entityToClass(playerEntity, new Player());
  }

  async findAll(): Promise<Player[]> {
    const players = await this.repository.find();
    return players.map((player) =>
      this.mapperService.entityToClass(player, new Player()),
    );
  }

  async remove(id: number): Promise<void> {
    const player = await this.repository.findOne({ where: { id } });
    if (!player) throw new Error('Player not found');
    await this.repository.remove(player);
  }

  async update(newInfoPlayer: Player, id: number): Promise<Player> {
    const player = await this.repository.findOne({ where: { id } });
    if (!player) throw new Error('Player not found');

    this.repository.merge(player, newInfoPlayer);
    const updatedPlayer = await this.repository.save(player);

    return this.mapperService.entityToClass(updatedPlayer, new Player());
  }
}
