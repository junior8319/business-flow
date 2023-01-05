import { NextFunction, Request, Response } from "express";
import ICnpj from "../interfaces/ICnpj";

const validateCreateCnpj = async (req: Request, res: Response, next: NextFunction) => {
  const cnpjObject: ICnpj = req.body;
  const { cnpj, companyType } = cnpjObject;

  if (!cnpjObject || Object.keys(cnpjObject).length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o CNPJ com cnpj e companyType.',
    });

    if (!cnpj || cnpj.length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o atributo cnpj para cadastrar.',
    });

  if (!companyType || companyType.length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o atributo companyType para cadastrar.',
    });

  next();
};

export default validateCreateCnpj;
