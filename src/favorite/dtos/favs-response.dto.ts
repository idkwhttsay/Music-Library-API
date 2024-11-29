import ArtistEntity from '../../artist/entities/artist.entity';
import AlbumEntity from '../../album/entities/album.entity';
import TrackEntity from '../../track/entities/track.entity';

export default class FavsResponseDto {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
