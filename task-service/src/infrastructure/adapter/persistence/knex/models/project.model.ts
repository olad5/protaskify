import { Model } from 'objection';

export const tableName = 'projects';

export class BaseModel extends Model {
  static get modelPaths() {
    return ['../models/'];
  }
}

export class ProjectModel extends BaseModel {
  id!: string;
  name!: string;
  description!: string;
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

export type ObjectionProject = Pick<
  ProjectModel,
  'id' | 'name' | 'description' | 'creator_id' | 'created_at' | 'updated_at'
>;
