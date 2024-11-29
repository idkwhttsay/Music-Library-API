import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrackEntity from './entities/track.entity';
import FavsTrackEntity from '../favorite/entities/favs-track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, FavsTrackEntity])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
