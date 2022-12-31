import { NextFunction, Request, Response } from 'express';
import OrdersService from '../services/Orders.service';
import IOrder from '../interfaces/IOrder';

class OrdersController {
  public service: OrdersService;

  public orderObject!: IOrder;

  public id!: number;

  constructor() {
    this.service = new OrdersService();
  }

  public getOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const ordersList: IOrder[] | null = await this.service.getOrders();

      if (!ordersList) return res.status(404)
        .json({
          message:
            'Não foi possível encontrar Notas Fiscais no banco de dados'
        });

      return res.status(200).json(ordersList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.id = Number(req.params.id);
      const order: IOrder | null = await this.service.getOrderById(this.id);

      if (!order) return res.status(404)
        .json({
          message:
            'Não foi possível encontrar a Nota Fiscal no banco de dados'
        });

      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.orderObject = req.body;

      const newOrder: IOrder | null = await this.service.createOrder(this.orderObject);
      if (!newOrder) return res.status(400).json({
        message: `Não foi possível cadastrar a Nota Fiscal.`,
      });

      return res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'Sem dado para atualizar.' });

      const orderObject = { ...req.body, id };

      const updatedOrder = await this.service.updateOrder(orderObject);
      if (!updatedOrder) return res.status(403)
        .json({
          message: 'Não foi possível alterar a Nota Fiscal' +
            ' pode ser que já exista uma NF cadastrada com estes dados.'
        });

      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public excludeOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Favor fornecer um identificador(id) para excluir.',
        });

      this.id = Number(id);
      const orderDeleted = await this.service.excludeOrder(this.id);
      if(!orderDeleted) return res.status(404)
        .json({ message: `Não conseguimos encontrar uma Nota pela id: ${id}` });

      return res.status(202).json({ message: 'Nota Fiscal excluída com sucesso.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new OrdersController();
