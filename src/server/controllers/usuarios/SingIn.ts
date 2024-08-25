import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { JWTService } from "../../shared/services";
import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { IUsuario } from "../../database/models";
import { PasswordCrypto } from "../../shared/services/PasswordCrypto";

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
  const password = PasswordCrypto.verifyPassword(senha, result.senha);
  if (!password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "E-mail ou senha inválidos",
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: result.id });

    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o token de acesso",
        },
      });
    }

    return res.status(StatusCodes.ACCEPTED).send({ token: accessToken });
  }
};
