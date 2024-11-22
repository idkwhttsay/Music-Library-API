import { Exclude, Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { HashService } from '../../../infrastructure/hashing/hash.service';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Column({ name: 'login' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await HashService.hash(this.password);
  }

  async checkPassword(password: any): Promise<boolean> {
    return await HashService.compare(password, this.password);
  }

  @Column({ name: 'password' })
  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  @ApiProperty({ writeOnly: true })
  password: string;

  @VersionColumn()
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ minimum: 1 })
  version: number;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  @ApiProperty({ format: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  @ApiProperty({ format: 'timestamp' })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  changePassword(newPassword: string): void {
    this.password = newPassword;
    this.updatedAt = new Date();
    this.version++;
  }
}
