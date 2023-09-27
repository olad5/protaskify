import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { CreateUserPort } from '../port/usecase/CreateUserPort';
import { User } from '../entity/User';

export type CreateUserUseCase = UseCase<CreateUserPort, User>;
