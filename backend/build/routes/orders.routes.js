"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Orders_controller_1 = __importDefault(require("../controllers/Orders.controller"));
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const orderCreate_middleware_1 = __importDefault(require("../middlewares/orderCreate.middleware"));
const orderUpdate_middleware_1 = __importDefault(require("../middlewares/orderUpdate.middleware"));
const ordersRouter = (0, express_1.Router)();
ordersRouter.get('/orders', Orders_controller_1.default.getOrders, error_middleware_1.default.handleErrors);
ordersRouter.get('/orders/:id', Orders_controller_1.default.getOrderById, error_middleware_1.default.handleErrors);
ordersRouter.post('/orders', orderCreate_middleware_1.default, Orders_controller_1.default.createOrder, error_middleware_1.default.handleErrors);
ordersRouter.put('/orders/:id', orderUpdate_middleware_1.default, Orders_controller_1.default.updateOrder, error_middleware_1.default.handleErrors);
ordersRouter.delete('/orders/:id', Orders_controller_1.default.excludeOrder, error_middleware_1.default.handleErrors);
exports.default = ordersRouter;
