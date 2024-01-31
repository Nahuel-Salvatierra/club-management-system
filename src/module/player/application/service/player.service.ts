import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PlayerRepository } from '../repository/player.repository';
import { CreatePlayerDto } from '../../controller/dto/create-player.dto';
import { Player } from '../../domain/player.domain';
import { MapperService } from '../../../../common/application/mapper/mapper.service';
@Injectable()
export class PlayerService {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private readonly playerRepository: PlayerRepository,
    private readonly mapperService: MapperService,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    try {
      const player = this.mapperService.dtoToClass(
        createPlayerDto,
        new Player(),
      );
      return await this.playerRepository.create(player);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async findOne(id: number): Promise<Player> {
    try {
      return await this.playerRepository.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
