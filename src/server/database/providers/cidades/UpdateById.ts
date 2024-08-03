import { Knex } from "../../knex";
import { ETableNames } from "../../../ETableNames";
import { ICidade } from "../../models";

export const updateById = async (
  id: Number,
  cidade: Omit<ICidade, "id">
): Promise<object | Error> => {
  try {
    console.log(typeof id);
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where("id", id);

    console.log(result);
    if (typeof result === "object") {
      return result;
    }
    return new Error("Erro ao cadastrar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar registro!");
  }
};
