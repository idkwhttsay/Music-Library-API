import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favs-artists' })
export default class FavsArtistEntity {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
