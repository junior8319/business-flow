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

  public updateProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'Sem dado para atualizar.' });

      const providerObject = { ...req.body, id };

      const updatedProvider = await this.service.updateProvider(providerObject);
      if (!updatedProvider) return res.status(400)
        .json({
          message: 'Não foi possível alterar dados da Cedente.'
        });

      return res.status(200).json(updatedProvider);
    } catch (error) {
      console.log(error);
      next(error);      
    }
  };

  public excludeProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Favor fornecer um identificador(id) para excluir.',
        });

      this.id = Number(id);
      const providerDeleted = await this.service.excludeProvider(this.id);
      if (!providerDeleted) return res.status(404)
        .json({
          message: `Não conseguimos encontrar uma Cedente pela id: ${id}`
        });

      return res.status(202).json({ message: 'Cedente excluída com sucesso.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new ProvidersController();
