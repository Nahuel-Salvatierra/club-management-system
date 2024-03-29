import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configuration/orm.configuration';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configuration/configuration';
import { configurationValidate } from './configuration/configuration.validate';
import { PlayerModule } from './module/player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
