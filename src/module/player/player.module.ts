import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './application/service/player.service';
import { PlayerEntity } from './infrastructure/persistance/entities/player.entity';
import { PlayerController } from './controller/player.controller';
import { PlayerMysqlRepository } from './infrastructure/persistance/player.mysql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    {
      provide: 'PLAYER_REPOSITORY',
      useClass: PlayerMysqlRepository,
    },
  ],
})
export class PlayerModule {}
