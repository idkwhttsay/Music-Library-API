import { config } from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import TrackEntity from '../../src/track/entities/track.entity';
import AlbumEntity from '../../src/album/entities/album.entity';
import ArtistEntity from '../../src/artist/entities/artist.entity';
import UserEntity from '../../src/user/entities/user.entity';
import FavsAlbumEntity from '../../src/favorite/entities/favs-album.entity';
import FavsTrackEntity from '../../src/favorite/entities/favs-track.entity';
import FavsArtistEntity from '../../src/favorite/entities/favs-artist.entity';

config();

const typeORMConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  entities: [
    TrackEntity,
    AlbumEntity,
    ArtistEntity,
    UserEntity,
    FavsAlbumEntity,
    FavsTrackEntity,
    FavsArtistEntity,
  ],
  logging: true,
};

export default typeORMConfig;
