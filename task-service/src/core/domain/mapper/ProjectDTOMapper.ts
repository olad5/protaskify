import { Project } from '../entity/Project';
export type ProjectDTO = {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
};

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
