import { NextFunction, Request, Response } from "express";
import BuyersService from "../../services/Buyers.service";
import IBuyer from "../../interfaces/IBuyer";


const validateCreateBuyer = async (req: Request, res: Response, next: NextFunction) => {
  const service = new BuyersService();
  const buyerObject: IBuyer = req.body;

  if (!buyerObject || Object.keys(buyerObject).length === 0) {
    return res.status(400).json({
      message: 'Sem dado para cadastrar. Favor preencher os campos.'
    });
  }

  const { name, tradingName } = buyerObject;

  if (name) {
    const alreadyExists = await service.existsBuyer({
      ...buyerObject,
      tradingName: '',
    });
    
    if (alreadyExists) return res.status(403)
      .json({
        message: `Já existe Compradora registrada com Nome Fantasia ${name}`
      });
  }

  if (tradingName) {
    const alreadyExists = await service.existsBuyer({
      ...buyerObject,
      name: '',
    });
    
    if (alreadyExists) return res.status(403)
      .json({
        message:
          `Já existe Compradora registrada com Nome ${tradingName}`
      });
  }

  next();
};

export default validateCreateBuyer;
