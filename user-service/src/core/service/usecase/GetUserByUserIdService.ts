import { Code } from '@protaskify/shared/code/Code';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { Exception } from '@protaskify/shared/exception/Exception';
import { User } from '../../domain/entity/User';
import { UserRepositoryPort } from '../../domain/port/persistence/UserRepositoryPort';
import { GetUserByUserIdPort } from '../../domain/port/usecase/GetUserByUserIdPort';
import { GetUserByUserIdUseCase } from '../../domain/usecase/GetUserByIdUseCase';

export class GetUserByUserIdService implements GetUserByUserIdUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: GetUserByUserIdPort): Promise<User> {
    const existingUser = await this.userRepository.findUserByUserId(
      payload.userId
    );
    const doesUserExist = !!existingUser;

    CoreAssert.throwIfFalse(
      doesUserExist,
      Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'user does not exist.',
      })
    );

    return existingUser;
  }
}
