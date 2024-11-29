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
import { AlbumService } from './album.service';
import CreateAlbumDto from './dtos/createAlbum.dto';
import UpdateAlbumDto from './dtos/updateAlbum.dto';
import AlbumEntity from './entities/album.entity';
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

@ApiTags('Album')
@Controller('album')
@ApiBearerAuth()
export class AlbumController {
  constructor(private readonly _albumService: AlbumService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, type: [AlbumEntity] })
  @Get()
  async getAll(): Promise<AlbumEntity[]> {
    return await this._albumService.getAll();
  }

  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 200, type: AlbumEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @Get(':id')
  async getAlbumById(@Param('id', UUIDPipe) id: string): Promise<AlbumEntity> {
    return await this._albumService.getAlbumById(id);
  }

  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({
    status: 201,
    description: 'The album has been created.',
    type: AlbumEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  @ApiBody({ type: CreateAlbumDto })
  @Post()
  async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumEntity> {
    return await this._albumService.createAlbum(createAlbumDto);
  }

  @ApiOperation({ summary: 'Update album' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({ status: 200, type: AlbumEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @Put(':id')
  async updateAlbum(
    @Param('id', UUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return await this._albumService.updateAlbum(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', UUIDPipe) id: string): Promise<void> {
    await this._albumService.deleteAlbum(id);
  }
}
