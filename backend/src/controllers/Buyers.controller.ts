import IBuyer from '../interfaces/IBuyer';
import { NextFunction, Request, Response } from 'express';
import BuyersService from '../services/Buyers.service';

class BuyersController {
  public service: BuyersService;

  public buyerObject!: IBuyer;

  public id!: number;

  constructor() {
    this.service = new BuyersService();
  }

  public getBuyers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const buyersList: IBuyer[] | null = await this.service.getBuyers();

      if (!buyersList) return res.status(404)
        .json({
          message:
            'Não foi possível encontrar Compradoras no banco de dados'
        });

      return res.status(200).json(buyersList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getBuyerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.id = Number(req.params.id);

      const buyer: IBuyer | null = await this.service.getBuyerById(this.id);
      if (!buyer) return res.status(404)
        .json({
          message:
            `Não foi possível encontrar a Compradora com id ${this.id}`,
        });

      return res.status(200).json(buyer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createBuyer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.buyerObject = req.body;

      const newBuyer: IBuyer | null = await this.service.createBuyer(this.buyerObject);
      if (!newBuyer) return res.status(400).json({
        message: 'Não foi possível cadastrar a Compradora',
      });

      return res.status(201).json(newBuyer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateBuyer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'Sem dado para atualizar.' });

      const buyerObject = { ...req.body, id };

      const updatedBuyer = await this.service.updateBuyer(buyerObject);
      if (!updatedBuyer) return res.status(400)
        .json({
          message: 'Não foi possível alterar dados da Compradora.'
        });

      return res.status(200).json(updatedBuyer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public excludeBuyer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Favor fornecer um identificador(id) para excluir.',
        });

      this.id = Number(id);
      const buyerDeleted = await this.service.excludeBuyer(this.id);
      if (!buyerDeleted) return res.status(404)
        .json({
          message: `Não conseguimos encontrar uma Compradora pela id: ${id}`
        });

      return res.status(202).json({ message: 'Compradora excluída com sucesso.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new BuyersController();
