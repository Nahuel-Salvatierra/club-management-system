import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../../../../app.module';
import {
  playerCreateDto,
  playerFixture1,
  playerUpdateDto,
} from './player.fixture';
import { Player } from '../../domain/player.domain';
import { LoaderService } from './../../../../common/application/loader/loader.service';
import { fixtureTree } from './../../../../common/fixtures/fixtureTree';

describe('Player Controller', () => {
  let app: INestApplication;
  let loaderService: LoaderService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    loaderService = app.get<LoaderService>(LoaderService);
  });

  beforeEach(async () => {
    await loaderService.loadFixtures(fixtureTree);
  });

  afterEach(async () => {
    await loaderService.dropFixtures();
  });

  describe('POST /player', () => {
    it('Should create a new player', async () => {
      const { body }: { body: Player } = await request(app.getHttpServer())
        .post('/player')
        .send(playerCreateDto);
      expect(body).toHaveProperty('id', 2);
      expect(body.dateOfBirth).toBeDefined();
      expect(body.firstName).toBe(playerCreateDto.firstName);
      expect(body.lastName).toBe(playerCreateDto.lastName);
      expect(body.name).toBe(playerCreateDto.name);
      expect(body.nationality).toBe(playerCreateDto.nationality);
      expect(body.position).toBe(playerCreateDto.position);
      expect(body.shirtNumber).toBe(playerCreateDto.shirtNumber);
      expect(body).toHaveProperty('createdAt');
      expect(body).toHaveProperty('updatedAt');
    });
  });

  describe('GET /player', () => {
    it('Should get array of player', async () => {
      const { body } = await request(app.getHttpServer()).get('/player');
      expect(body).toHaveLength(1);
      expect(body[0]).toHaveProperty('name', playerFixture1.name);
      expect(body[0]).toHaveProperty('firstName', playerFixture1.firstName);
      expect(body[0]).toHaveProperty('lastName', playerFixture1.lastName);
      expect(body[0]).toHaveProperty('nationality', playerFixture1.nationality);
      expect(body[0]).toHaveProperty('position', playerFixture1.position);
      expect(body[0]).toHaveProperty('shirtNumber', playerFixture1.shirtNumber);
      expect(body[1]).toBeUndefined();
    });

    it('Should get a player by ID', async () => {
      const { body } = await request(app.getHttpServer()).get('/player/1');
      expect(body).toHaveProperty('name', playerFixture1.name);
      expect(body).toHaveProperty('firstName', playerFixture1.firstName);
      expect(body).toHaveProperty('lastName', playerFixture1.lastName);
      expect(body).toHaveProperty('nationality', playerFixture1.nationality);
      expect(body).toHaveProperty('position', playerFixture1.position);
      expect(body).toHaveProperty('shirtNumber', playerFixture1.shirtNumber);
    });

    it('Should throw 404 if player not found', async () => {
      await request(app.getHttpServer()).get('/player/999').expect(404);
    });
  });

  describe('/PUT /player', () => {
    it('Should update a player', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/player/1')
        .send(playerUpdateDto);
      expect(body).toHaveProperty('id', 1);
      expect(body).toHaveProperty('name', playerUpdateDto.name);
      expect(body).toHaveProperty('lastName', playerUpdateDto.lastName);
      expect(body).toHaveProperty('shirtNumber', playerCreateDto.shirtNumber);
    });
  });
});
