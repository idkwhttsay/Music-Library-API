import UserEntity from '../user/entities/user.entity';

export interface JwtPayload {
  sub: UserEntity['id'];
  userId: UserEntity['id'];
  login: UserEntity['login'];
}
