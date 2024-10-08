import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";
import { Knex } from "../../knex";

export const getById = async (id: Number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Erro ao cadastrar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar registro!");
  }
};
