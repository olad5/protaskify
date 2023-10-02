import { Model } from 'objection';

export const tableName = 'users';

export class BaseModel extends Model {
  static get modelPaths() {
    return ['../models/'];
  }
}

export class UserModel extends BaseModel {
  id!: string;
  email!: string;
  first_name!: string;
  last_name!: string;
  password!: string;

  static get tableName(): string {
    return tableName;
  }
  static get idColumn(): string {
    return 'id';
  }
}

export type ObjectionUser = Pick<
  UserModel,
  'id' | 'email' | 'first_name' | 'last_name' | 'password'
>;
