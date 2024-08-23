import { IPessoa } from "../../models";
import { ICidade } from "../models";

declare module "knex/types/tables" {
  interface Tables {
    cidade: ICidade;
    pessoa: IPessoa;
  }
}
