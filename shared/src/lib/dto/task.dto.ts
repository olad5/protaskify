export type TaskDTO = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  projectId: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
};

export type HttpRestApiCreateTaskBody = {
  title: string;
  description: string;
  dueDate: string;
  projectId: string;
};

export type HttpRestApiAssignTaskBody = {
  taskId: string;
  assigneeId: string;
};
export type HttpRestApiGetTaskByTaskIdBody = {
  id: string;
};

export type ProjectDTO = {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
};

export type HttpRestApiCreateProjectBody = {
  name: string;
  description: string;
  creatorId: string;
};

export type HttpRestApiGetProjectByProjectIdBody = {
  id: string;
};

export type HttpRestApiGetTasksByProjectIdBody = {
  projectId: string;
  tasks: TaskDTO[];
};
