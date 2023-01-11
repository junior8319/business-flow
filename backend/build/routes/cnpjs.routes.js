"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cnpjs_controller_1 = __importDefault(require("../controllers/Cnpjs.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const cnpjCreate_middleware_1 = __importDefault(require("../middlewares/cnpjCreate.middleware"));
const cnpjUpdate_middleware_1 = __importDefault(require("../middlewares/cnpjUpdate.middleware"));
const cnpjsRouter = (0, express_1.Router)();
cnpjsRouter.get('/cnpjs', Cnpjs_controller_1.default.getCnpjs, error_middleware_1.default.handleErrors);
cnpjsRouter.get('/cnpjs/:id', Cnpjs_controller_1.default.getCnpjById, error_middleware_1.default.handleErrors);
cnpjsRouter.post('/cnpjs', cnpjCreate_middleware_1.default, Cnpjs_controller_1.default.createCnpj, error_middleware_1.default.handleErrors);
cnpjsRouter.put('/cnpjs/:id', cnpjUpdate_middleware_1.default, Cnpjs_controller_1.default.updateCnpj, error_middleware_1.default.handleErrors);
cnpjsRouter.delete('/cnpjs/:id', Cnpjs_controller_1.default.excludeCnpj, error_middleware_1.default.handleErrors);
exports.default = cnpjsRouter;
