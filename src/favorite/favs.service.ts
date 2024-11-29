import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import AlbumEntity from '../album/entities/album.entity';
import TrackEntity from '../track/entities/track.entity';
import ArtistEntity from '../artist/entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import FavsTrackEntity from './entities/favs-track.entity';
import { Repository } from 'typeorm';
import FavsAlbumEntity from './entities/favs-album.entity';
import FavsArtistEntity from './entities/favs-artist.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsTrackEntity)
    private readonly _favsTrackRepository: Repository<FavsTrackEntity>,
    @InjectRepository(FavsAlbumEntity)
    private readonly _favsAlbumRepository: Repository<FavsAlbumEntity>,
    @InjectRepository(FavsArtistEntity)
    private readonly _favsArtistRepository: Repository<FavsArtistEntity>,
    @InjectRepository(ArtistEntity)
    private readonly _artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly _trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly _albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    const artistIds: FavsArtistEntity[] =
      await this._favsArtistRepository.find();
    const albumIds: FavsAlbumEntity[] = await this._favsAlbumRepository.find();
    const trackIds: FavsTrackEntity[] = await this._favsTrackRepository.find();

    const artists: ArtistEntity[] = [];
    for (let i = 0; i < artistIds.length; ++i) {
      artists.push(
        await this._artistRepository.findOneBy({ id: artistIds[i].id }),
      );
    }

    const albums: AlbumEntity[] = [];
    for (let i = 0; i < albumIds.length; ++i) {
      albums.push(
        await this._albumRepository.findOneBy({ id: albumIds[i].id }),
      );
    }

    const tracks: TrackEntity[] = [];
    for (let i = 0; i < trackIds.length; ++i) {
      tracks.push(
        await this._trackRepository.findOneBy({ id: trackIds[i].id }),
      );
    }

    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }

  async addTrackToFavs(id: string): Promise<TrackEntity> {
    const value: TrackEntity = await this._trackRepository.findOneBy({ id });
    if (value === null) {
      throw new UnprocessableEntityException();
    }

    await this._favsTrackRepository.save({ id: value.id });
    return value;
  }

  async addAlbumToFavs(id: string): Promise<AlbumEntity> {
    const value: AlbumEntity = await this._albumRepository.findOneBy({ id });
    if (value === null) {
      throw new UnprocessableEntityException();
    }

    await this._favsAlbumRepository.save({ id: value.id });
    return value;
  }

  async addArtistToFavs(id: string): Promise<ArtistEntity> {
    const value: ArtistEntity = await this._artistRepository.findOneBy({ id });
    if (value === null) {
      throw new UnprocessableEntityException();
    }

    await this._favsArtistRepository.save({ id: value.id });
    return value;
  }

  async deleteTrackFromFavs(id: string): Promise<void> {
    const value: FavsTrackEntity = await this._favsTrackRepository.findOneBy({
      id,
    });
    if (value === null) {
      throw new NotFoundException();
    }

    await this._favsTrackRepository.remove(value);
  }

  async deleteArtistFromFavs(id: string): Promise<void> {
    const value: FavsArtistEntity = await this._favsArtistRepository.findOneBy({
      id,
    });
    if (value === null) {
      throw new NotFoundException();
    }

    await this._favsArtistRepository.delete(value);
  }

  async deleteAlbumFromFavs(id: string): Promise<void> {
    const value: FavsAlbumEntity = await this._favsAlbumRepository.findOneBy({
      id,
    });
    if (value === null) {
      throw new NotFoundException();
    }

    await this._favsAlbumRepository.remove(value);
  }
}
