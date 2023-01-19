"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Providers_controller_1 = __importDefault(require("../controllers/Providers.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const providersRouter = (0, express_1.Router)();
providersRouter.get('/providers', Providers_controller_1.default.getProviders, error_middleware_1.default.handleErrors);
providersRouter.get('/providers/:id', Providers_controller_1.default.getProviderById, error_middleware_1.default.handleErrors);
providersRouter.post('/providers', Providers_controller_1.default.createProvider, error_middleware_1.default.handleErrors);
providersRouter.put('/providers/:id', Providers_controller_1.default.updateProvider, error_middleware_1.default.handleErrors);
providersRouter.delete('/providers/:id', Providers_controller_1.default.excludeProvider, error_middleware_1.default.handleErrors);
exports.default = providersRouter;
