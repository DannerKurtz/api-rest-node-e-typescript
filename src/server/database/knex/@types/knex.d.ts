import { IPessoa, ICidade, IUsuario } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    cidades: ICidade;
    pessoas: IPessoa;
    usuario: IUsuario;
  }
}
