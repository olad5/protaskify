import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { Task } from '../entity/Task';
import { GetTaskByTaskIdPort } from '../port/usecase/GetTaskByTaskIdPort';

export type GetTaskByTaskIdUseCase = UseCase<GetTaskByTaskIdPort, Task>;
