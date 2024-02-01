import {
  PlayerFixture,
  playerFixture1,
} from './../../module/player/controller/__test__/player.fixture';

export interface FixtureTree {
  PlayerEntity: PlayerFixture[];
}

export const fixtureTree: FixtureTree = {
  PlayerEntity: [playerFixture1],
};
