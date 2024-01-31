import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './application/service/player.service';
import { PlayerEntity } from './infrastructure/persistance/entities/player.entity';
import { PlayerController } from './controller/player.controller';
import { PlayerMysqlRepository } from './infrastructure/persistance/player.mysql.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    CommonModule,
    {
      provide: 'PLAYER_REPOSITORY',
      useClass: PlayerMysqlRepository,
    },
  ],
})
export class PlayerModule {}
