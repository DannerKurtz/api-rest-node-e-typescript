import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa, "id"> {}
export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nomeCompleto: yup.string().required().min(3),
      email: yup.string().email().required().min(3),
      cidadeId: yup.number().integer().required(),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }

  const result = await PessoasProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
