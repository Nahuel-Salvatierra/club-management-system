import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../../../../app.module';
import { player1 } from './player.fixture';
import { Player } from '../../domain/player.domain';

describe('Player Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST /player', () => {
    it('Should be create a new player', async () => {
      const { body }: { body: Player } = await request(app.getHttpServer())
        .post('/player')
        .send(player1);
      expect(body).toHaveProperty('id', 1);
      expect(body.dateOfBirth).toBeDefined();
      expect(body.firstName).toBe(player1.firstName);
      expect(body.lastName).toBe(player1.lastName);
      expect(body.name).toBe(player1.name);
      expect(body.nationality).toBe(player1.nationality);
      expect(body.position).toBe(player1.position);
      expect(body.shirtNumber).toBe(player1.shirtNumber);
      expect(body).toHaveProperty('createdAt');
      expect(body).toHaveProperty('updatedAt');
    });
  });
});
