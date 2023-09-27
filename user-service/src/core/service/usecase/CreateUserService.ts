import { Code } from '@protaskify/shared/code/Code';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import { Exception } from '@protaskify/shared/exception/Exception';
import { User } from '../../domain/entity/User';
import { UserRepositoryPort } from '../../domain/port/persistence/UserRepositoryPort';
import { CreateUserUseCase } from '../../domain/usecase/CreateUserUseCase';
import { CreateUserPort } from '../../domain/port/usecase/CreateUserPort';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: CreateUserPort): Promise<User> {
    const doesUserExist = !!(await this.userRepository.findUserByUserEmail(
      payload.email
    ));
    CoreAssert.throwIfTrue(
      doesUserExist,
      Exception.new({
        code: Code.CONFLICT_ERROR,
        overrideMessage: 'User already exists.',
      })
    );

    const user: User = await User.new({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    await this.userRepository.createUser(user);

    return user;
  }
}
