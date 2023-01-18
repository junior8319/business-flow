import ProvidersService from '../services/Providers.service';
import IProvider from '../interfaces/IProvider';
import { NextFunction, Request, Response } from 'express';

class ProvidersController {
  public service: ProvidersService;

  public providerObject!: IProvider;

  public id!: number;

  constructor() {
    this.service = new ProvidersService();
  }

  public getProviders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const providersList: IProvider[] | null = await this.service.getProviders();

      if (!providersList) return res.status(404)
        .json({
          message:
            'Não foi possível encontrar Cedentes no banco de dados'
        });
      
      return res.status(200).json(providersList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new ProvidersController();
