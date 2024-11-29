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
import { UserService } from './user.service';
import CreateUserDto from './dtos/createUser.dto';
import UpdatePasswordDto from './dtos/updatePassword.dto';
import UserEntity from './entities/user.entity';
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

@ApiBearerAuth()
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 200,
    type: [UserEntity],
  })
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this._userService.getAll();
  }

  @ApiOperation({ summary: 'Get single user by ID' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: "record with id === userId doesn't exist",
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Id of user',
  })
  @Get(':id')
  async getUserById(@Param('id', UUIDPipe) id: string): Promise<UserEntity> {
    return await this._userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    type: UserEntity,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this._userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update single user' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  async updatePassword(
    @Param('id', UUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return await this._userService.updateUserPassword(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', UUIDPipe) id: string): Promise<void> {
    await this._userService.deleteUser(id);
  }
}
