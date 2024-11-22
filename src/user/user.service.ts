import UserEntity from './entities/user.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import CreateUserDto from './dtos/createUser.dto';
import UpdatePasswordDto from './dtos/updatePassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from '../../infrastructure/hashing/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this._userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user: UserEntity = await this._userRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity({
      id: uuid(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this._userRepository.save(user);
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const value: UserEntity = await this._userRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    if (await HashService.compare(dto.oldPassword, value.password)) {
      throw new ForbiddenException();
    }

    value.changePassword(await HashService.hash(dto.newPassword));
    return await this._userRepository.save(value);
  }

  async deleteUser(id: string): Promise<void> {
    const value: UserEntity = await this._userRepository.findOneBy({ id });
    if (value === null) {
      throw new NotFoundException();
    }

    await this._userRepository.remove(value);
  }

  findByLogin(login: string) {
    return this._userRepository.findOne({ where: { login } });
  }
}
