import { Model } from 'objection';

export const tableName = 'tasks_users';

export class BaseModel extends Model {
  static get modelPaths() {
    return ['../models/'];
  }
}

export class TaskUserModel extends BaseModel {
  assignee_id!: string;
  task_id!: string;
  created_at!: string;
  updated_at!: string;

  static get tableName(): string {
    return tableName;
  }
  static get idColumn(): string {
    return 'id';
  }
}

export type ObjectionProject = Pick<
  TaskUserModel,
  'task_id' | 'assignee_id' | 'created_at' | 'updated_at'
>;
