"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Order_model_1 = __importDefault(require("../database/models/Order.model"));
const Provider_model_1 = __importDefault(require("../database/models/Provider.model"));
const Buyer_model_1 = __importDefault(require("../database/models/Buyer.model"));
class OrdersService {
    constructor() {
        this.getOrders = () => __awaiter(this, void 0, void 0, function* () {
            const ordersList = yield Order_model_1.default.findAll({
                include: [
                    { model: Provider_model_1.default, as: 'provider' },
                    { model: Buyer_model_1.default, as: 'buyer' },
                ],
            });
            if (!ordersList)
                return null;
            return ordersList.map(orderObject => orderObject.dataValues);
        });
        this.getOrderById = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            this.id = receivedId;
            const order = yield Order_model_1.default.findByPk(this.id);
            if (!order)
                return null;
            return order;
        });
        this.createOrder = (receivedOrder) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedOrder)
                return null;
            const orderExists = yield OrdersService.existsOrder(receivedOrder);
            if (orderExists)
                return null;
            const newOrder = yield Order_model_1.default.create(Object.assign({}, receivedOrder));
            if (!newOrder)
                return null;
            return newOrder.dataValues;
        });
        this.updateOrder = (receivedOrder) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedOrder || !receivedOrder.id)
                return null;
            this.id = receivedOrder.id;
            const orderToUpdate = yield Order_model_1.default.findByPk(this.id);
            if (!orderToUpdate)
                return null;
            if (receivedOrder.orderNfId ||
                receivedOrder.orderPath ||
                receivedOrder.orderFileName ||
                receivedOrder.orderOriginalName) {
                const alreadyExists = yield OrdersService.existsOrder(receivedOrder);
                if (alreadyExists)
                    return null;
            }
            ;
            yield orderToUpdate.update(receivedOrder);
            return orderToUpdate.dataValues;
        });
        this.excludeOrder = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const orderToExclude = yield Order_model_1.default.findByPk(this.id);
            if (!orderToExclude)
                return null;
            yield orderToExclude.destroy();
            return orderToExclude.dataValues;
        });
        OrdersService.model = new Order_model_1.default();
    }
}
_a = OrdersService;
OrdersService.existsOrder = (receivedOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderNumber, orderPath, orderFileName, orderOriginalName, } = receivedOrder;
    const order = yield Order_model_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [
                { orderNfId: (orderNumber) ? orderNumber : null },
                { orderPath: (orderPath) ? orderPath : null },
                { orderFileName: (orderFileName) ? orderFileName : null },
                { orderOriginalName: (orderOriginalName) ? orderOriginalName : null },
            ],
        },
    });
    const exists = !!order;
    return exists;
});
exports.default = OrdersService;
