import { NextFunction, Request, Response } from "express";
import ICnpj from "../interfaces/ICnpj";
import CnpjsService from "../services/Cnpjs.service";

const validateCreateCnpj = async (req: Request, res: Response, next: NextFunction) => {
  const cnpjObject: ICnpj = req.body;
  const { cnpj, companyType } = cnpjObject;

  if (!cnpjObject || Object.keys(cnpjObject).length === 0) return res.status(400)
    .json({
      message: 'Sem dado para atualizar.',
    });
  
  if (cnpj) {
    const cnpjExists = await CnpjsService.existsCnpj(cnpj);
    if (cnpjExists) return res.status(403)
      .json({ message: `Já existe empresa cadastrada com o CNPJ ${cnpj}` });
  }

  if (cnpj.length === 0 && companyType.length === 0) return res.status(400)
  .json({
    message: 'Nada recebido para atualizar.',
    });

  next();
};

export default validateCreateCnpj;
