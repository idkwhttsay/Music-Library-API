import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import AlbumEntity from './entities/album.entity';
import TrackEntity from '../track/entities/track.entity';
import FavsAlbumEntity from '../favorite/entities/favs-album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, TrackEntity, FavsAlbumEntity]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
