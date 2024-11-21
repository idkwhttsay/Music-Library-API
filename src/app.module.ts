import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { FavsModule } from './favorite/favs.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EnvironmentModule } from '../infrastructure/configurations/environment.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { AppLoggerModule } from '../infrastructure/logger/app-logger.module';

config();

const domainModules = [
  TrackModule,
  AlbumModule,
  FavsModule,
  ArtistModule,
  UserModule,
];

const infrastructureModules = [
  EnvironmentModule,
  AppLoggerModule,
  ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV === 'Development',
    autoLoadEntities: true,
  }),
];

@Module({
  imports: [...domainModules, ...infrastructureModules],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
