import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tracks' })
export default class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id: string; // uuid v4

  @Column({ name: 'name' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column({ name: 'artistId', nullable: true })
  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: string | null; // refers to Artist

  @Column({ name: 'albumId', nullable: true })
  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  albumId: string | null; // refers to Album

  @Column({ name: 'duration' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 1 })
  duration: number; // integer number

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
