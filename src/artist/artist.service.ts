import ArtistEntity from './entities/artist.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import CreateArtistDto from './dtos/createArtist.dto';
import { v4 as uuid } from 'uuid';
import UpdateArtistDto from './dtos/updateArtist.dto';
import TrackEntity from '../track/entities/track.entity';
import AlbumEntity from '../album/entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FavsArtistEntity from '../favorite/entities/favs-artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly _artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly _trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly _albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FavsArtistEntity)
    private readonly _favsArtistRepository: Repository<FavsArtistEntity>,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return await this._artistRepository.find();
  }

  async getArtistById(id: string): Promise<ArtistEntity> {
    const value: ArtistEntity = await this._artistRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    return value;
  }

  async createArtist(dto: CreateArtistDto): Promise<ArtistEntity> {
    const artist: ArtistEntity = new ArtistEntity({
      id: uuid(),
      name: dto.name,
      grammy: dto.grammy,
    });

    return await this._artistRepository.save(artist);
  }

  async updateArtist(id: string, dto: UpdateArtistDto): Promise<ArtistEntity> {
    const value: ArtistEntity = await this._artistRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    if (dto.name !== undefined) {
      value.name = dto.name;
    }

    if (dto.grammy !== undefined) {
      value.grammy = dto.grammy;
    }

    return await this._artistRepository.save(value);
  }

  async deleteArtist(id: string): Promise<void> {
    const value: ArtistEntity = await this._artistRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    await this._favsArtistRepository.remove({ id: value.id });
    await this._trackRepository.update({ artistId: id }, { artistId: null });
    await this._albumRepository.update({ artistId: id }, { artistId: null });
    await this._artistRepository.remove(value);
  }
}
