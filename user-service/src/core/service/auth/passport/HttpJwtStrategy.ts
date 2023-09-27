import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { Exception } from '@protaskify/shared/exception/Exception';
import { Code } from '@protaskify/shared/code/Code';
import { HttpAuthService } from '../HttpAuthService';
import { HttpJwtPayload, HttpUserPayload } from '../type/HttpAuthTypes';
import { User } from 'user-service/src/core/domain/entity/User';
import { ApiServerConfig } from 'user-service/src/infrastructure/config/ApiServerConfig';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: HttpAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ApiServerConfig.ACCESS_TOKEN_SECRET,
    });
  }

  public async validate(payload: HttpJwtPayload): Promise<HttpUserPayload> {
    const user: User = CoreAssert.notEmpty(
      await this.authService.getUser(payload.id),
      Exception.new({ code: Code.UNAUTHORIZED_ERROR })
    );

    return { id: user.getId(), email: user.getEmail() };
  }
}
