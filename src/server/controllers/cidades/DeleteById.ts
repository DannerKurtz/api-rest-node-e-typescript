import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { CidadesProvider } from "../../database/providers/cidades";

interface IParamsProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
  const result = await CidadesProvider.deleteById(Number(req.params.id));
  return res.status(StatusCodes.OK).json(result);
};
