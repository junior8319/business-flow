import { Router } from 'express';
import OrdersController from '../controllers/Orders.controller';
import errorMiddleware from '../middlewares/error.middleware';
import validateCreateOrder from '../middlewares/orderCreate.middleware';
import validateUpdateOrder from '../middlewares/orderUpdate.middleware';

const ordersRouter = Router();

ordersRouter.get(
  '/orders',
  OrdersController.getOrders,
  errorMiddleware.handleErrors,
);

ordersRouter.get(
  '/orders/:id',
  OrdersController.getOrderById,
  errorMiddleware.handleErrors,
);

ordersRouter.post(
  '/orders',
  validateCreateOrder,
  OrdersController.createOrder,
  errorMiddleware.handleErrors,
);

ordersRouter.put(
  '/orders/:id',
  validateUpdateOrder,
  OrdersController.updateOrder,
  errorMiddleware.handleErrors,
);

ordersRouter.delete(
  '/orders/:id',
  OrdersController.excludeOrder,
  errorMiddleware.handleErrors,
);

export default ordersRouter;
