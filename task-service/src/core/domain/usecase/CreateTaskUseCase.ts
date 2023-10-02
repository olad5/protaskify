import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { CreateTaskPort } from '../port/usecase/CreateTaskPort';
import { Task } from '../entity/Task';

export type CreateTaskUseCase = UseCase<CreateTaskPort, Task>;
