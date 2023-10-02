import { Project } from 'task-service/src/core/domain/entity/Project';
import { ObjectionProject, ProjectModel } from '../../models/project.model';

export class ObjectionProjectMapper {
  public static toPersistence(domainProject: Project): ObjectionProject {
    const objectionProject: ObjectionProject = {
      id: domainProject.getId(),
      name: domainProject.getName(),
      description: domainProject.getDescription(),
      creator_id: domainProject.getCreatorId(),
      created_at: domainProject.getCreatedAt(),
      updated_at: domainProject.getUpdatedAt(),
    };
    return objectionProject;
  }

  public static toDomainEntity(objectionProject: ProjectModel): Project {
    const domainProject: Project = new Project({
      id: objectionProject.id,
      name: objectionProject.name,
      description: objectionProject.description,
      creatorId: objectionProject.creator_id,
      createdAt: objectionProject.created_at,
      updatedAt: objectionProject.updated_at,
    });

    return domainProject;
  }
}
