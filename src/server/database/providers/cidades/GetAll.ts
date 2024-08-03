import { Knex } from "../../knex";
import { ETableNames } from "../../../ETableNames";

export const getAll = async (): Promise<object | Error> => {
  try {
    const [result] = [
      await Knex(ETableNames.cidade).select("id", "nome").from("cidades"),
    ];

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
