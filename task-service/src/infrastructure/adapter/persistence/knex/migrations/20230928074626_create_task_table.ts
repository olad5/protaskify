import { Knex } from 'knex';
import { tableName } from '../models/task.model';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(tableName, (table) => {
    table.uuid('id').notNullable().unique().primary();
    table.string('title', 250).notNullable();
    table.string('description', 250).notNullable();
    table.string('project_id', 150).notNullable();
    table.string('creator_id', 150).notNullable();
    table.timestamp('due_date').defaultTo(knex.fn.now());
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(tableName);
}
