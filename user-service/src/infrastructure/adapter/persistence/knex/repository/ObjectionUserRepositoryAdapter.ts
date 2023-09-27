import { Inject } from '@nestjs/common';
import { UserRepositoryPort } from 'user-service/src/core/domain/port/persistence/UserRepositoryPort';
import { User } from 'user-service/src/core/domain/entity/User';
import { UserModel } from '../models/user.model';
import { ObjectionUserMapper } from '../entity/mapper/ObjectionUserMapper';

export class ObjectionUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @Inject(UserModel) private readonly userModel: typeof UserModel
  ) {}

  async createUser(user: User): Promise<void> {
    const objectionUser = ObjectionUserMapper.toPersistence(user);

    await this.userModel.query().insert({
      ...objectionUser,
    });
  }

  async findUserByUserId(id: string): Promise<User> {
    const objectionUser = await this.userModel.query().findById(id);
    return objectionUser
      ? ObjectionUserMapper.toDomainEntity(objectionUser)
      : undefined;
  }

  async findUserByUserEmail(email: string): Promise<User> {
    const objectionUser = await this.userModel.query().findOne('email', email);
    return objectionUser
      ? ObjectionUserMapper.toDomainEntity(objectionUser)
      : undefined;
  }
}
