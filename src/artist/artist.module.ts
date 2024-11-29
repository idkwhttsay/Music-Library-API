import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ArtistEntity from './entities/artist.entity';
import TrackEntity from '../track/entities/track.entity';
import AlbumEntity from '../album/entities/album.entity';
import FavsArtistEntity from '../favorite/entities/favs-artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      TrackEntity,
      AlbumEntity,
      FavsArtistEntity,
    ]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
