import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { IPessoa } from "../../models";

export const updateById = async (
  id: Number,
  pessoa: Omit<IPessoa, "id">
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", pessoa.cidadeId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada no cadastro não foi encontrada");
    }

    const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where("id", id);

    console.log(result);

    if (result > 0) return;

    return new Error("Erro ao atualizar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar registro!");
  }
};
