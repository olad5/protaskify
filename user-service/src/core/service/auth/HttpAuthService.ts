import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpJwtPayload, HttpUserPayload } from './type/HttpAuthTypes';
import { Nullable, Optional } from '@protaskify/shared/type/CommonTypes';
import { User } from '../../domain/entity/User';
import { UserDITokens } from 'user-service/src/app/di/UserDITokens';
import { UserRepositoryPort } from '../../domain/port/persistence/UserRepositoryPort';
import { HttpRestApiLoginUserResponse } from '@protaskify/shared/dto/';

@Injectable()
export class HttpAuthService {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,

    private readonly jwtService: JwtService
  ) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<Nullable<HttpUserPayload>> {
    const user: Optional<User> = await this.userRepository.findUserByUserEmail(
      email
    );

    if (user) {
      const isPasswordValid: boolean = await user.comparePassword(password);
      if (isPasswordValid) {
        return {
          id: user.getId(),
          email: user.getEmail(),
        };
      }
    }

    return null;
  }

  public login(user: HttpUserPayload): HttpRestApiLoginUserResponse {
    const payload: HttpJwtPayload = { id: user.id };
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }
  public async getUser(userId: string): Promise<Optional<User>> {
    const foundUser = await this.userRepository.findUserByUserId(userId);
    return foundUser;
  }
}
