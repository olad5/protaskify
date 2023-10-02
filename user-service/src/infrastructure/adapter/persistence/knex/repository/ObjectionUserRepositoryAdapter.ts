import { RedisClient } from '@protaskify/shared/infrastructure/adapter/cache/redis/redis.service';
import { Inject } from '@nestjs/common';
import { UserRepositoryPort } from 'user-service/src/core/domain/port/persistence/UserRepositoryPort';
import { User } from 'user-service/src/core/domain/entity/User';
import { UserModel } from '../models/user.model';
import { ObjectionUserMapper } from '../entity/mapper/ObjectionUserMapper';
import { UserDTO } from '@protaskify/shared/dto';
import { RedisUserMapper } from '../entity/mapper/RedisUserMapper';

export class ObjectionUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @Inject(UserModel) private readonly userModel: typeof UserModel,
    private readonly cache: RedisClient
  ) {}

  async createUser(user: User): Promise<void> {
    const objectionUser = ObjectionUserMapper.toPersistence(user);
    await this.userModel.query().insert({
      ...objectionUser,
    });
  }

  async findUserByUserId(id: string): Promise<User> {
    const cachedUser = await this.cache.getOne<UserDTO & { password: string }>(
      id
    );
    if (cachedUser !== undefined) {
      return await RedisUserMapper.toDomainEntity(cachedUser);
    }

    const objectionUser = await this.userModel.query().findById(id);
    if (!objectionUser) {
      return undefined;
    }
    const user = ObjectionUserMapper.toDomainEntity(objectionUser);
    await this.cache.set(user.getId(), user);
    return user;
  }

  async findUserByUserEmail(email: string): Promise<User> {
    const objectionUser = await this.userModel.query().findOne('email', email);
    return objectionUser
      ? ObjectionUserMapper.toDomainEntity(objectionUser)
      : undefined;
  }
}
