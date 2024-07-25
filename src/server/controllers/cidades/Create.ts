import { Request, Response } from "express";

interface ICidade {
  nome: String;
  estado_cidade: String;
}

export const create = (req: Request<{}, {}, ICidade>, res: Response) =>{
  const data = req.body;

  
  return res.json(data);
};