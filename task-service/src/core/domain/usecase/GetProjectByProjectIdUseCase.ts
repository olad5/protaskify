import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { GetProjectByProjectIdPort } from '../port/usecase/GetProjectByProjectIdPort';
import { Project } from '../entity/Project';

export type GetProjectByProjectIdUseCase = UseCase<
  GetProjectByProjectIdPort,
  Project
>;
