import { Router } from 'express';
import ProvidersController from '../controllers/Providers.controller';
import errorMiddleware from '../middlewares/error.middleware';

const providersRouter = Router();

providersRouter.get(
  '/providers',
  ProvidersController.getProviders,
  errorMiddleware.handleErrors,
);

providersRouter.get(
  '/providers/:id',
  ProvidersController.getProviderById,
  errorMiddleware.handleErrors,
);

providersRouter.post(
  '/providers',
  ProvidersController.createProvider,
  errorMiddleware.handleErrors,
);

providersRouter.put(
  '/providers/:id',
  ProvidersController.updateProvider,
  errorMiddleware.handleErrors,
);

providersRouter.delete(
  '/providers/:id',
  ProvidersController.excludeProvider,
  errorMiddleware.handleErrors,
);

export default providersRouter;
