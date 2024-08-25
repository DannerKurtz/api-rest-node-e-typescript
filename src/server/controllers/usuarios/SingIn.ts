import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { IUsuario } from "../../database/models";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const singInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().min(6),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const singIn = async (req: Request<IBodyProps>, res: Response) => {
  const { email, senha } = req.body;

  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "E-mail ou senha inválidos",
      },
    });
  }

  if (senha !== result.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "E-mail ou senha inválidos",
      },
    });
  } else {
    return res
      .status(StatusCodes.ACCEPTED)
      .send({ token: "teste.teste.teste" });
  }
};
