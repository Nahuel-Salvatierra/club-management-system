import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configuration/orm.configuration';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configuration/configuration';
import { configurationValidate } from './configuration/configuration.validate';
import { PlayerModule } from './module/player/player.module';
import { FileModule } from './module/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
      exclude: ['/api/(.*)'],
    }),
    PlayerModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
