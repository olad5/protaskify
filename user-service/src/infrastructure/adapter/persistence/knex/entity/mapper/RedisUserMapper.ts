import { User } from 'user-service/src/core/domain/entity/User';
import { UserDTO } from '@protaskify/shared/dto';

export class RedisUserMapper {
  public static async toDomainEntity(
    redisUser: UserDTO & { password: string }
  ): Promise<User> {
    return await User.new({
      id: redisUser.id,
      email: redisUser.email,
      firstName: redisUser.firstName,
      lastName: redisUser.lastName,
      password: redisUser.password,
    });
  }
}
