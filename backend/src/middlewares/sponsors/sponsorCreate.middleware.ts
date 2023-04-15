import { NextFunction, Request, Response } from "express";
import ISponsor from '../../interfaces/ISponsor';
import SponsorsService from "../../services/Sponsors.service";


const validateCreateSponsor = async (req: Request, res: Response, next: NextFunction) => {
  const service = new SponsorsService();
  const sponsorObject: ISponsor = req.body;

  if (!sponsorObject || Object.keys(sponsorObject).length === 0) {
    return res.status(400).json({
      message: 'Sem dado para cadastrar. Favor preencher os campos.'
    });
  }

  const { name, tradingName } = sponsorObject;

  if (name) {
    const alreadyExists = await service.existsSponsor({
      ...sponsorObject,
      tradingName: '',
    });
    
    if (alreadyExists) return res.status(403)
      .json({
        message: `Já existe parceira registrada com Nome Fantasia ${name}`
      });
  }

  if (tradingName) {
    const alreadyExists = await service.existsSponsor({
      ...sponsorObject,
      name: '',
    });
    
    if (alreadyExists) return res.status(403)
      .json({
        message:
          `Já existe parceira registrada com Nome ${tradingName}`
      });
  }

  next();
};

export default validateCreateSponsor;
