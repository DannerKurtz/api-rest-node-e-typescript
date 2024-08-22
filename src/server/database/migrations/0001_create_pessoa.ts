import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";

export async function up(knex: Knex): Promise<void> {
  knex.schema
    .createTable(ETableNames.pessoa, (table) => {
      table.bigIncrements("id", { primaryKey: true }).index();
      table.string("nomeCompleto").index().notNullable();
      table.string("email").index().unique().notNullable;

      table
        .bigInteger("cidadeId")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment("Tabela usada para armazenar pessoas do sistema.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`# Dropped table ${ETableNames.pessoa}`);
  });
}
