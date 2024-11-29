import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import TrackEntity from './entities/track.entity';
import CreateTrackDto from './dtos/createTrack.dto';
import UpdateTrackDto from './dtos/updateTrack.dto';
import UUIDPipe from '../../infrastructure/pipes/uuid-validation.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/auth.decorator';

@Controller('track')
@ApiTags('Tracks')
@ApiBearerAuth()
export class TrackController {
  constructor(private readonly _trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [TrackEntity] })
  @Get()
  async getAll(): Promise<TrackEntity[]> {
    return await this._trackService.getAll();
  }

  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 200, type: TrackEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Get(':id')
  async getTrackById(@Param('id', UUIDPipe) id: string): Promise<TrackEntity> {
    return await this._trackService.getTrackById(id);
  }

  @ApiOperation({ summary: 'Create track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    description: 'The track has been created.',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  @Post()
  async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return await this._trackService.createTrack(createTrackDto);
  }

  @ApiOperation({ summary: 'Update track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({ status: 200, type: TrackEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Put(':id')
  async updateTrack(
    @Param('id', UUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return await this._trackService.updateTrack(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', UUIDPipe) id: string): Promise<void> {
    await this._trackService.deleteTrack(id);
  }
}
