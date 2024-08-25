import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { IPessoa } from "../../models";

export const getById = async (id: Number): Promise<IPessoa | Error> => {
  try {
    console.log(typeof id);
    const [result] = await Knex(ETableNames.pessoa)
      .select(
        "pessoas.id",
        "pessoas.nomeCompleto",
        "pessoas.email",
        "cidades.nome"
      )
      .where("pessoas.cidadeId", id)
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
