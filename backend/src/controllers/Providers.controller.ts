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

  public getProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.id = Number(req.params.id);
      
      const provider: IProvider | null = await this.service.getProviderById(this.id);
      if (!provider) return res.status(404)
        .json({
          message:
            `Não foi possível encontrar a Cedente com id ${this.id}`,
        });

      return res.status(200).json(provider);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.providerObject = req.body;

      const newProvider: IProvider | null = await this.service.createProvider(this.providerObject);
      if (!newProvider) return res.status(400).json({
        message: 'Não foi possível cadastrar a cedente',
      });

      return res.status(201).json(newProvider);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new ProvidersController();
