import { UseCase } from '@protaskify/shared/usecase/UseCase';
import { CreateProjectPort } from '../port/usecase/CreateProjectPort';
import { Project } from '../entity/Project';

export type CreateProjectUseCase = UseCase<CreateProjectPort, Project>;
