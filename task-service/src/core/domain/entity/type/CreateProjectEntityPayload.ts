export type CreateProjectEntityPayload = {
  name: string;
  description: string;
  creatorId: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
