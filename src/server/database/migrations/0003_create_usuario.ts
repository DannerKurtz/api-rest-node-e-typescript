import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.usuario, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").notNullable().checkLength(">=", 3);
      table.string("email").index().unique().notNullable().checkLength(">", 6);
      table.string("senha").notNullable().checkLength(">=", 6);

      table.comment("Tabela usada para armazenar usuários do sistema.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`# Dropped table ${ETableNames.pessoa}`);
  });
}
