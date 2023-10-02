import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { AssignTaskPort } from '../port/usecase/AssignTaskPort';
import { Task } from '../entity/Task';

export type AssignTaskUseCase = UseCase<AssignTaskPort, Task>;
