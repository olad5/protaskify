import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Code } from '@protaskify/shared/code/Code';
import { Exception } from '@protaskify/shared/exception/Exception';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';

@Injectable()
export class HttpJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    CoreAssert.throwIfTrue(
      err || !user,
      Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
      })
    );

    return user;
  }
}
