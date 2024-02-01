import { Player } from '../../domain/player.domain';

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  findById(id: number): Promise<Player>;
  findAll(): Promise<Player[]>;
  remove(id: number): Promise<void>;
  update(newInfoPlayer: Player, id: number): Promise<Player>;
}
