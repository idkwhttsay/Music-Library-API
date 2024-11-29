import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artists' })
export default class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Column({ name: 'name' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column({ name: 'grammy' })
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
