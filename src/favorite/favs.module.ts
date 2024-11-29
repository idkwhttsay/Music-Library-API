import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import FavsAlbumEntity from './entities/favs-album.entity';
import FavsArtistEntity from './entities/favs-artist.entity';
import FavsTrackEntity from './entities/favs-track.entity';
import ArtistEntity from '../artist/entities/artist.entity';
import TrackEntity from '../track/entities/track.entity';
import AlbumEntity from '../album/entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavsAlbumEntity,
      FavsArtistEntity,
      FavsTrackEntity,
      ArtistEntity,
      TrackEntity,
      AlbumEntity,
    ]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
