import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { GetUserByUserIdPort } from '../port/usecase/GetUserByUserIdPort';
import { User } from '../entity/User';

export type GetUserByUserIdUseCase = UseCase<GetUserByUserIdPort, User>;
