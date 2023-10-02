import { ProjectDTO } from '@protaskify/shared/dto';
import { Project } from '../entity/Project';

export function ToProjectDTO(project: Project): ProjectDTO {
  return {
    id: project.getId(),
    name: project.getName(),
    description: project.getDescription(),
    creatorId: project.getCreatorId(),
    createdAt: project.getCreatedAt().toISOString(),
    updatedAt: project.getUpdatedAt().toISOString(),
  };
}
