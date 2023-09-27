import { UserDTO } from '@protaskify/shared/dto/';
import { User } from '../entity/User';

export function ToUserDTO(user: User): UserDTO {
  return {
    id: user.getId(),
    firstName: user.getFirstName(),
    lastName: user.getLastName(),
    email: user.getEmail(),
  };
}
