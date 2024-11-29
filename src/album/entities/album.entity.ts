import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'albums' })
export default class AlbumEntity {
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

  @Column({ name: 'year' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(1900)
  @ApiProperty({ format: 'year', minimum: 1900 })
  year: number;

  @Column({ name: 'artistId', nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: string | null; // refers to Artist

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
