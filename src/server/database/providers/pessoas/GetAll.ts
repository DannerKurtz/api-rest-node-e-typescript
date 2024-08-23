import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<object | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select(
        "pessoas.id as pessoa_id",
        "pessoas.nomeCompleto",
        "pessoas.email",
        "cidades.nome as cidade_nome"
      )
      .join("cidades", "cidades.id", "pessoas.cidadeId")
      .where("pessoas.id", Number(id))
      .orWhere("pessoas.nomeCompleto", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.pessoa)
        .select(
          "pessoas.id as pessoa_id",
          "pessoas.nomeCompleto",
          "pessoas.email",
          "cidades.nome as cidade_nome"
        )
        .where("id", "=", id)
        .join("cidades", "cidades.id", "pessoas.cidadeId")
        .first();
      if (resultById) return [...result, resultById];
    }
    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registro!");
  }
};
