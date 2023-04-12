import { Router } from 'express';
import errorMiddleware from '../middlewares/error.middleware';
import BuyersController from '../controllers/Buyers.controller';
import validateCreateBuyer from '../middlewares/buyers/buyerCreate.middleware';

const buyersRouter = Router();

buyersRouter.get(
  '/buyers',
  BuyersController.getBuyers,
  errorMiddleware.handleErrors,
);

buyersRouter.get(
  '/buyers/:id',
  BuyersController.getBuyerById,
  errorMiddleware.handleErrors,
);

buyersRouter.post(
  '/buyers',
  validateCreateBuyer,
  BuyersController.createBuyer,
  errorMiddleware.handleErrors,
);

buyersRouter.put(
  '/buyers/:id',
  BuyersController.updateBuyer,
  errorMiddleware.handleErrors,
);

buyersRouter.delete(
  '/buyers/:id',
  BuyersController.excludeBuyer,
  errorMiddleware.handleErrors,
);

export default buyersRouter;
