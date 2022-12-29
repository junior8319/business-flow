import { NextFunction, Request, Response } from 'express';
import ICnpj from '../interfaces/ICnpj';
import CnpjsService from '../services/Cnpjs.service';

class CnpjsController {
  public service: CnpjsService;

  public cnpjObject!: ICnpj;

  public id!: number;

  public cnpj!: string;

  constructor() {
    this.service = new CnpjsService();
  }

  public getCnpjs = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const cnpjsList: ICnpj[] | null = await this.service.getCnpjs();

      if (!cnpjsList) return res.status(404)
        .json({ message: 'Não foi possível encontrar CNPJ\'s no banco de dados' });

      return res.status(200).json(cnpjsList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getCnpjById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.id = Number(req.params.id);
      const cnpj: ICnpj | null = await this.service.getCnpjById(this.id);

      if (!cnpj) return res.status(404)
        .json({ message: 'Não foi possível encontrar o CNPJ no banco de dados' });

      return res.status(200).json(cnpj);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createCnpj = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.cnpjObject = req.body;

      const newCnpj: ICnpj | null = await this.service.createCnpj(this.cnpjObject);
      if (!newCnpj) return res.status(400).json({
        message: `Não foi possível cadastrar o CNPJ.`,
      });

      return res.status(201).json(newCnpj);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateCnpj = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'Sem dado para atualizar.' });

      const cnpjObject = { ...req.body, id };

      const updatedCnpj = await this.service.updateCnpj(cnpjObject);
      if (!updatedCnpj) return res.status(403)
        .json({
          message: 'Não foi possível alterar o CNPJ' +
            ' pode ser que já exista um CNPJ cadastrado com este número.'
        });

      return res.status(200).json(updatedCnpj);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public excludeCnpj = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Favor fornecer um identificador(id) para excluir.',
        });

      this.id = Number(id);
      const cnpjDeleted = await this.service.excludeCnpj(this.id);
      if(!cnpjDeleted) return res.status(404)
        .json({ message: `Não conseguimos encontrar um CNPJ pela id: ${id}` });

      return res.status(202).json({ message: 'CNPJ excluído com sucesso.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new CnpjsController();
