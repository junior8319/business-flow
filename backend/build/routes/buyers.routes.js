"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const Buyers_controller_1 = __importDefault(require("../controllers/Buyers.controller"));
const buyerCreate_middleware_1 = __importDefault(require("../middlewares/buyers/buyerCreate.middleware"));
const buyersRouter = (0, express_1.Router)();
buyersRouter.get('/buyers', Buyers_controller_1.default.getBuyers, error_middleware_1.default.handleErrors);
buyersRouter.get('/buyers/:id', Buyers_controller_1.default.getBuyerById, error_middleware_1.default.handleErrors);
buyersRouter.post('/buyers', buyerCreate_middleware_1.default, Buyers_controller_1.default.createBuyer, error_middleware_1.default.handleErrors);
buyersRouter.put('/buyers/:id', Buyers_controller_1.default.updateBuyer, error_middleware_1.default.handleErrors);
buyersRouter.delete('/buyers/:id', Buyers_controller_1.default.excludeBuyer, error_middleware_1.default.handleErrors);
exports.default = buyersRouter;
