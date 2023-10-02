export type CreateTaskEntityPayload = {
  title: string;
  description: string;
  dueDate: Date;
  projectId: string;
  id?: string;
  creatorId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
