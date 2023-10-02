import { Knex } from 'knex';
import { tableName } from '../models/task_user.model';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(tableName, (table) => {
    table.uuid('assignee_id').notNullable();
    table.uuid('task_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(tableName);
}
