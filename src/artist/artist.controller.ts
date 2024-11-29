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
import { ArtistService } from './artist.service';
import ArtistEntity from './entities/artist.entity';
import CreateArtistDto from './dtos/createArtist.dto';
import UpdateArtistDto from './dtos/updateArtist.dto';
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

@Controller('artist')
@ApiBearerAuth()
@ApiTags('Artists')
export class ArtistController {
  constructor(private readonly _artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, type: [ArtistEntity] })
  @Get()
  async getAll(): Promise<ArtistEntity[]> {
    return await this._artistService.getAll();
  }

  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({ status: 200, type: ArtistEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @Get(':id')
  async getArtistById(
    @Param('id', UUIDPipe) id: string,
  ): Promise<ArtistEntity> {
    return await this._artistService.getArtistById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: 201,
    description: 'The artist has been created.',
    type: ArtistEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  async createArtist(
    @Body() createTrackDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return await this._artistService.createArtist(createTrackDto);
  }

  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({ status: 200, type: ArtistEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @Put(':id')
  async updateArtist(
    @Param('id', UUIDPipe) id: string,
    @Body() updateTrackDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return await this._artistService.updateArtist(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', UUIDPipe) id: string): Promise<void> {
    await this._artistService.deleteArtist(id);
  }
}
