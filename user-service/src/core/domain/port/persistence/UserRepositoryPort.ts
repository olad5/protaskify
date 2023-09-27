import { Optional } from '@protaskify/shared/type/CommonTypes';
import { User } from '../../entity/User';

export interface UserRepositoryPort {
  findUserByUserId(id: string): Promise<Optional<User>>;
  findUserByUserEmail(email: string): Promise<Optional<User>>;
  createUser(user: User): Promise<void>;
}
