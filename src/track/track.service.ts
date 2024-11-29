import TrackEntity from './entities/track.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import CreateTrackDto from './dtos/createTrack.dto';
import { v4 as uuid } from 'uuid';
import UpdateTrackDto from './dtos/updateTrack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FavsTrackEntity from '../favorite/entities/favs-track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly _trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavsTrackEntity)
    private readonly _favsTrackRepository: Repository<FavsTrackEntity>,
  ) {}

  async getAll(): Promise<TrackEntity[]> {
    return await this._trackRepository.find();
  }

  async getTrackById(id: string): Promise<TrackEntity> {
    const value: TrackEntity = await this._trackRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    return value;
  }

  async createTrack(dto: CreateTrackDto): Promise<TrackEntity> {
    const track: TrackEntity = new TrackEntity({
      id: uuid(),
      name: dto.name,
      albumId: dto.albumId || null,
      artistId: dto.artistId || null,
      duration: dto.duration,
    });

    return await this._trackRepository.save(track);
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<TrackEntity> {
    const value: TrackEntity = await this._trackRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    if (dto.name !== undefined) {
      value.name = dto.name;
    }
    if (dto.artistId !== undefined) {
      value.artistId = dto.artistId;
    }
    if (dto.albumId !== undefined) {
      value.albumId = dto.albumId;
    }
    if (dto.duration !== undefined) {
      value.duration = dto.duration;
    }

    return await this._trackRepository.save(value);
  }

  async deleteTrack(id: string): Promise<void> {
    const value: TrackEntity = await this._trackRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    await this._favsTrackRepository.remove({ id: value.id });
    await this._trackRepository.remove(value);
  }
}
