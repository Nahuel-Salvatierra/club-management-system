import { Player } from '../../domain/player.domain';
import { PlayerEntity } from '../../infrastructure/persistance/entities/player.entity';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

export interface PlayerFixture extends Player {}

export const playerCreateDto: CreatePlayerDto = {
  name: 'player1',
  firstName: 'player1',
  lastName: 'player1',
  dateOfBirth: new Date('1990-01-01'),
  nationality: 'player1',
  position: 'player1',
  shirtNumber: 10,
};

export const playerFixture1: PlayerEntity = {
  id: 1,
  name: 'playerFixture1Name',
  firstName: 'playerFixture1FirstName',
  lastName: 'playerFixture1LastName',
  dateOfBirth: new Date('1990-01-01'),
  nationality: 'playerFixture1Nationality',
  position: 'playerFixture1Position',
  shirtNumber: 10,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const playerUpdateDto: Partial<UpdatePlayerDto> = {
  name: 'updatedName',
  lastName: 'UpdatedLastName',
  dateOfBirth: new Date('1990-01-01'),
  nationality: 'updatedNationality',
  shirtNumber: 10,
};
