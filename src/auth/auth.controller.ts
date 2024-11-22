import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import CreateUserDto from '../user/dtos/createUser.dto';
import UserEntity from '../user/entities/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    protected _authService: AuthService,
    protected _userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'User Sign Up' })
  @ApiResponse({ status: 201, description: 'Registered' })
  @ApiResponse({ status: 400, description: 'Invalid DTO' })
  async sign(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return (
      (await this._userService.findByLogin(createUserDto.login)) ||
      this._userService.createUser(createUserDto)
    );
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User Sign In' })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400, description: 'Invalid DTO' })
  @ApiResponse({ status: 403, description: 'Wrong Credentials' })
  async login(@Body() loginUserDto: AuthDto): Promise<TokenDto> {
    const user: UserEntity = await this._userService.findByLogin(
      loginUserDto.login,
    );
    if (!user || !(await user.checkPassword(loginUserDto.password))) {
      throw new ForbiddenException();
    }

    return {
      accessToken: this._authService.generateToken(user),
      refreshToken: this._authService.generateRefreshToken(user),
    };
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 401, description: 'Invalid DTO' })
  @ApiResponse({ status: 403, description: 'Wrong Credentials' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenDto> {
    const id = this._authService.verifyToken(refreshTokenDto.refreshToken);

    if (id) {
      const user = await this._userService.getUserById(id);
      if (!user) {
        throw new ForbiddenException();
      }

      return {
        accessToken: this._authService.generateToken(user),
        refreshToken: this._authService.generateRefreshToken(user),
      };
    }

    throw new ForbiddenException();
  }
}
