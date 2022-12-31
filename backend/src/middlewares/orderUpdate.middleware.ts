import { NextFunction, Request, Response } from "express";
import IOrder from "../interfaces/IOrder";
import OrdersService from '../services/Orders.service';

const validateUpdateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderObject: IOrder = req.body;
  const orderKeys: string[] = Object.keys(orderObject);
  const uniqueKeys: string[] = [
    'orderNfId',
    'orderPath',
    'orderFileName',
    'orderOriginalName',
  ];

  if (
    !orderObject ||
    Object.keys(orderObject).length === 0
  ) return res.status(400)
    .json({
      message: `Sem dado para atualizar`,
    });

  if (orderKeys.some(key => uniqueKeys.includes(key))) {
    const orderExists = await OrdersService.existsOrder(orderObject);
    if (orderExists) return res.status(403)
      .json({ message: `Já existe nota fiscal cadastrada com os dados ${JSON.stringify(orderObject)}` });
  }

  next();
};

export default validateUpdateOrder;
