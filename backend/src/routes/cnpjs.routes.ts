import { Router } from 'express';
import CnpjsController from '../controllers/Cnpjs.controller';
import errorMiddleware from '../middlewares/error.middleware';
import validateCreateCnpj from '../middlewares/cnpjCreate.middleware';
import validateUpdateCnpj from '../middlewares/cnpjUpdate.middleware';

const cnpjsRouter = Router();

cnpjsRouter.get(
  '/cnpjs',
  CnpjsController.getCnpjs,
  errorMiddleware.handleErrors,
);

cnpjsRouter.get(
  '/cnpjs/:id',
  CnpjsController.getCnpjById,
  errorMiddleware.handleErrors,
);

cnpjsRouter.post(
  '/cnpjs',
  validateCreateCnpj,
  CnpjsController.createCnpj,
  errorMiddleware.handleErrors,
);

cnpjsRouter.put(
  '/cnpjs/:id',
  validateUpdateCnpj,
  CnpjsController.updateCnpj,
  errorMiddleware.handleErrors,
);

cnpjsRouter.delete(
  '/cnpjs/:id',
  CnpjsController.excludeCnpj,
  errorMiddleware.handleErrors,
);

export default cnpjsRouter;
