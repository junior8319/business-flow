import { Router } from 'express';
import SponsorsController from '../controllers/Sponsors.controller';
import errorMiddleware from '../middlewares/error.middleware';
import validateCreateSponsor from '../middlewares/sponsors/sponsorCreate.middleware';

const sponsorsRouter = Router();

sponsorsRouter.get(
  '/sponsors',
  SponsorsController.getSponsors,
  errorMiddleware.handleErrors,
);

sponsorsRouter.get(
  '/sponsors/:id',
  SponsorsController.getSponsorById,
  errorMiddleware.handleErrors,
);

sponsorsRouter.post(
  '/sponsors',
  validateCreateSponsor,
  SponsorsController.createSponsor,
  errorMiddleware.handleErrors,
);

sponsorsRouter.put(
  '/sponsors/:id',
  SponsorsController.updateSponsor,
  errorMiddleware.handleErrors,
);

sponsorsRouter.delete(
  '/sponsors/:id',
  SponsorsController.excludeSponsor,
  errorMiddleware.handleErrors,
);

export default sponsorsRouter;
