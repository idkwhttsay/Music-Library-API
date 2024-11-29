import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favs-tracks' })
export default class FavsTrackEntity {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
