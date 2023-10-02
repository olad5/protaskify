import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { GetTasksAssignedToUserPort } from '../port/usecase/GetTasksAssignedToUserPort';
import { Task } from '../entity/Task';

export type GetTasksAssignedToUserUseCase = UseCase<
  GetTasksAssignedToUserPort,
  Task[]
>;
