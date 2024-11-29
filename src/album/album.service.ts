import { Injectable, NotFoundException } from '@nestjs/common';
import AlbumEntity from './entities/album.entity';
import CreateAlbumDto from './dtos/createAlbum.dto';
import { v4 as uuid } from 'uuid';
import UpdateAlbumDto from './dtos/updateAlbum.dto';
import TrackEntity from '../track/entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FavsAlbumEntity from '../favorite/entities/favs-album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly _albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly _trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavsAlbumEntity)
    private readonly _favsAlbumRepository: Repository<FavsAlbumEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this._albumRepository.find();
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    const value: AlbumEntity = await this._albumRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    return value;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<AlbumEntity> {
    const album: AlbumEntity = new AlbumEntity({
      id: uuid(),
      name: dto.name,
      artistId: dto.artistId,
      year: dto.year,
    });

    return await this._albumRepository.save(album);
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto): Promise<AlbumEntity> {
    const value: AlbumEntity = await this._albumRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    if (dto.year !== undefined) {
      value.year = dto.year;
    }

    if (dto.name !== undefined) {
      value.name = dto.name;
    }

    if (dto.artistId !== undefined) {
      value.artistId = dto.artistId;
    }

    return await this._albumRepository.save(value);
  }

  async deleteAlbum(id: string): Promise<void> {
    const value: AlbumEntity = await this._albumRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    await this._favsAlbumRepository.remove({ id: value.id });
    await this._trackRepository.update({ albumId: id }, { albumId: null });
    await this._albumRepository.remove(value);
  }
}
