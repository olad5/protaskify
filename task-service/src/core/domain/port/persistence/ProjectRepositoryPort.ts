import { Optional } from '@protaskify/shared/type/CommonTypes';
import { Project } from '../../entity/Project';

export interface ProjectRepositoryPort {
  findProjectByProjectId(id: string): Promise<Optional<Project>>;
  createProject(project: Project): Promise<void>;
}
