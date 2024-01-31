import { Player } from '../../domain/player.domain';

export interface PlayerRepository {
  save(player: Player): Promise<void>;
}
