import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as deleteByIdById from "./DeleteById";

export const CidadesProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteByIdById,
};
