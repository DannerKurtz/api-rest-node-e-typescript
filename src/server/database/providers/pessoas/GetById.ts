import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const getById = async (id: Number): Promise<object | Error> => {
  try {
    console.log(typeof id);
    const [result] = await Knex(ETableNames.pessoa)
      .select(
        "pessoas.id",
        "pessoas.nomeCompleto",
        "pessoas.email",
        "cidades.nome"
      )
      .where("pessoas.id", id)
      .join("cidades", "cidades.id", "pessoas.cidadeId");

    console.log(result);
    if (typeof result === "object") {
      return result;
    }
    return new Error("Erro ao buscar registro!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao buscar registro!");
  }
};
