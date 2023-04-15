"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Sponsors_controller_1 = __importDefault(require("../controllers/Sponsors.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const sponsorCreate_middleware_1 = __importDefault(require("../middlewares/sponsors/sponsorCreate.middleware"));
const sponsorsRouter = (0, express_1.Router)();
sponsorsRouter.get('/sponsors', Sponsors_controller_1.default.getSponsors, error_middleware_1.default.handleErrors);
sponsorsRouter.get('/sponsors/:id', Sponsors_controller_1.default.getSponsorById, error_middleware_1.default.handleErrors);
sponsorsRouter.post('/sponsors', sponsorCreate_middleware_1.default, Sponsors_controller_1.default.createSponsor, error_middleware_1.default.handleErrors);
sponsorsRouter.put('/sponsors/:id', Sponsors_controller_1.default.updateSponsor, error_middleware_1.default.handleErrors);
sponsorsRouter.delete('/sponsors/:id', Sponsors_controller_1.default.excludeSponsor, error_middleware_1.default.handleErrors);
exports.default = sponsorsRouter;
