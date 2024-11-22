import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './auth.interface';

import UserEntity from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(protected readonly _jwtService: JwtService) {}

  verifyToken(token: string): UserEntity['id'] | null {
    try {
      const payload = this._jwtService.verify(token);
      return payload.sub;
    } catch {
      return null;
    }
  }

  generateToken(user: UserEntity): string {
    return this._jwtService.sign(this.generatePayload(user), {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '60s',
    });
  }

  generateRefreshToken(user: UserEntity): string {
    return this._jwtService.sign(this.generatePayload(user), {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '1h',
    });
  }

  private generatePayload(user: UserEntity): JwtPayload {
    return { sub: user.id, userId: user.id, login: user.login };
  }
}
