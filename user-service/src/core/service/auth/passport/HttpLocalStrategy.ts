import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpAuthService } from '../HttpAuthService';
import { HttpUserPayload } from '../type/HttpAuthTypes';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { Exception } from '@protaskify/shared/exception/Exception';
import { Code } from '@protaskify/shared/code/Code';

@Injectable()
export class HttpLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: HttpAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  public async validate(
    email: string,
    password: string
  ): Promise<HttpUserPayload> {
    const user: HttpUserPayload = CoreAssert.notEmpty(
      await this.authService.validateUser(email, password),
      Exception.new({ code: Code.UNAUTHORIZED_ERROR })
    );

    return user;
  }
}
