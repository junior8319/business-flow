import { NextFunction, Request, Response } from "express";
import IProvider from '../../interfaces/IProvider';
import ProvidersService from "../../services/Providers.service";


const validateCreateProvider = async (req: Request, res: Response, next: NextFunction) => {
  const service = new ProvidersService();
  const providerObject: IProvider = req.body;

  if (!providerObject || Object.keys(providerObject).length === 0) {
    return res.status(400).json({
      message: 'Sem dado para cadastrar. Favor preencher os campos.'
    });
  }

  const { name, tradingName } = providerObject;

  if (name) {
    const alreadyExists = await service.existsProvider({
      ...providerObject,
      tradingName: '',
    });
    
    if (alreadyExists) return res.status(403)
      .json({
        message: `Já existe Cedente registrada com Nome Fantasia ${name}`
      });
  }

  if (tradingName) {
    const alreadyExists = await service.existsProvider({
      ...providerObject,
      name: '',
    });
    
    if (alreadyExists) return res.status(403)
      .json({
        message:
          `Já existe Cedente registrada com Nome ${tradingName}`
      });
  }

  next();
};

export default validateCreateProvider;
