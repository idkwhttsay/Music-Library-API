import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import UUIDPipe from '../../infrastructure/pipes/uuid-validation.pipe';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import FavsResponseDto from './dtos/favs-response.dto';
import FavsTrackEntity from './entities/favs-track.entity';
import FavsArtistEntity from './entities/favs-artist.entity';
import FavsAlbumEntity from './entities/favs-album.entity';
import { Public } from '../auth/auth.decorator';

@Controller('favs')
@ApiBearerAuth()
@ApiTags('Favorites')
export class FavsController {
  constructor(private readonly _favsService: FavsService) {}

  @ApiOperation({ summary: 'Get user favorites' })
  @ApiResponse({ status: 200, type: FavsResponseDto })
  @Get()
  async getAll() {
    return await this._favsService.getAll();
  }

  @ApiOperation({ summary: 'Add track to favs' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({
    status: 201,
    description: 'The track has been added.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID has invalid format',
  })
  @ApiResponse({
    status: 422,
    description: "The track doesn't exist",
  })
  @Post('track/:id')
  async addTrackToFavs(
    @Param('id', UUIDPipe) id: string,
  ): Promise<FavsTrackEntity> {
    return await this._favsService.addTrackToFavs(id);
  }

  @ApiOperation({ summary: 'Add artist to favs' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({
    status: 201,
    description: 'The artist has been added.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID has invalid format',
  })
  @ApiResponse({
    status: 422,
    description: "The artist doesn't exist",
  })
  @Post('artist/:id')
  async addArtistToFavs(
    @Param('id', UUIDPipe) id: string,
  ): Promise<FavsArtistEntity> {
    return await this._favsService.addArtistToFavs(id);
  }

  @ApiOperation({ summary: 'Add album to favs' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({
    status: 201,
    description: 'The album has been added.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID has invalid format',
  })
  @ApiResponse({
    status: 422,
    description: "The album doesn't exist",
  })
  @Post('album/:id')
  async addAlbumToFavs(
    @Param('id', UUIDPipe) id: string,
  ): Promise<FavsAlbumEntity> {
    return await this._favsService.addAlbumToFavs(id);
  }

  @ApiOperation({ summary: 'Remove track from favs' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavs(@Param('id', UUIDPipe) id: string): Promise<void> {
    await this._favsService.deleteTrackFromFavs(id);
  }

  @ApiOperation({ summary: 'Remove album from favs' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavs(@Param('id', UUIDPipe) id: string): Promise<void> {
    await this._favsService.deleteAlbumFromFavs(id);
  }

  @ApiOperation({ summary: 'Remove artist from favs' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavs(@Param('id', UUIDPipe) id: string): Promise<void> {
    await this._favsService.deleteArtistFromFavs(id);
  }
}
