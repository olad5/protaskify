import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { GetTasksByProjectIdPort } from '../port/usecase/GetTasksByProjectIdPort';
import { Task } from '../entity/Task';

export type GetTasksByProjectIdUseCase = UseCase<
  GetTasksByProjectIdPort,
  Task[]
>;
