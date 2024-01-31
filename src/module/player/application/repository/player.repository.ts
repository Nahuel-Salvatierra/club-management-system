import { Player } from '../../domain/player.domain';

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  findById(id: number): Promise<Player>;
}
