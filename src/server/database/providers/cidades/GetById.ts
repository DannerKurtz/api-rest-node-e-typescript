import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const getById = async (id: Number): Promise<object | Error> => {
  try {
    console.log(typeof id);
    const [result] = await Knex(ETableNames.cidade)
      .select("id", "nome")
      .from("cidades")
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
