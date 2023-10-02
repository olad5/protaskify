import { Model } from 'objection';

export const tableName = 'tasks';

export class BaseModel extends Model {
  static get modelPaths() {
    return ['../models/'];
  }
}

export class TaskModel extends BaseModel {
  id!: string;
  title!: string;
  description!: string;
  due_date!: Date;
  project_id!: string;
  creator_id!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName(): string {
    return tableName;
  }
  static get idColumn(): string {
    return 'id';
  }
}

export type ObjectionTask = Pick<
  TaskModel,
  | 'id'
  | 'title'
  | 'description'
  | 'due_date'
  | 'project_id'
  | 'creator_id'
  | 'created_at'
  | 'updated_at'
>;
