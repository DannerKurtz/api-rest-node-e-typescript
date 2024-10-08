import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa).where("id", "=", id).del();

    console.log(result);
    if (result > 0) return;

    return new Error("Erro ao cadastrar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar registro!");
  }
};
