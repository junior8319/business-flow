import { NextFunction, Request, Response } from "express";
import IOrder from "../interfaces/IOrder";
import OrdersService from '../services/Orders.service';

const validateCreateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderObject: IOrder = req.body;
  const {
    orderNfId,
    orderNumber,
    emitedTo,
    orderStatusBuyer,
    orderStatusProvider,  
  } = orderObject;

  const requiredKeys = [
    'orderNfId',
    'orderNumber',
    'emitedTo',
    'orderStatusBuyer',
    'orderStatusProvider',
  ];

  const uniqueKeys: string[] = [
    'orderNfId',
    'orderPath',
    'orderFileName',
    'orderOriginalName',
  ];

  const receivedKeys = Object.keys(orderObject);

  if (
    !orderObject ||
    receivedKeys.length === 0 ||
    requiredKeys.some(key => !receivedKeys.includes(key))
  ) return res.status(400)
    .json({
      message: `Os campos ${requiredKeys} são obrigatórios no cadastro`,
    });

    if (orderNfId.length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o atributo orderNfId para cadastrar.',
    });

  if (orderNumber.length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o atributo orderNumber para cadastrar.',
    });

  if (emitedTo.length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o atributo emitedTo para cadastrar.',
    });

  if (orderStatusBuyer.length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o atributo orderStatusBuyer para cadastrar.',
    });

  if (orderStatusProvider.length === 0) return res.status(400)
    .json({
      message: 'É necessário informar o atributo orderStatusProvider para cadastrar.',
    });

  if (receivedKeys.some(key => uniqueKeys.includes(key))) {
    const orderExists = await OrdersService.existsOrder(orderObject);
    if (orderExists) return res.status(403)
      .json({ message: `Já existe nota fiscal cadastrada com os dados ${JSON.stringify(orderObject)}` });
  }

  next();
};

export default validateCreateOrder;
