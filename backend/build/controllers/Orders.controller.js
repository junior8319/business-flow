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
Object.defineProperty(exports, "__esModule", { value: true });
const Orders_service_1 = __importDefault(require("../services/Orders.service"));
class OrdersController {
    constructor() {
        this.getOrders = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ordersList = yield this.service.getOrders();
                if (!ordersList)
                    return res.status(404)
                        .json({
                        message: 'Não foi possível encontrar Notas Fiscais no banco de dados'
                    });
                return res.status(200).json(ordersList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getOrderById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.id = Number(req.params.id);
                const order = yield this.service.getOrderById(this.id);
                if (!order)
                    return res.status(404)
                        .json({
                        message: 'Não foi possível encontrar a Nota Fiscal no banco de dados'
                    });
                return res.status(200).json(order);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.orderObject = req.body;
                const newOrder = yield this.service.createOrder(this.orderObject);
                if (!newOrder)
                    return res.status(400).json({
                        message: `Não foi possível cadastrar a Nota Fiscal.`,
                    });
                return res.status(201).json(newOrder);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar.' });
                const orderObject = Object.assign(Object.assign({}, req.body), { id });
                const updatedOrder = yield this.service.updateOrder(orderObject);
                if (!updatedOrder)
                    return res.status(403)
                        .json({
                        message: 'Não foi possível alterar a Nota Fiscal' +
                            ' pode ser que já exista uma NF cadastrada com estes dados.'
                    });
                return res.status(200).json(updatedOrder);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.excludeOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Favor fornecer um identificador(id) para excluir.',
                    });
                this.id = Number(id);
                const orderDeleted = yield this.service.excludeOrder(this.id);
                if (!orderDeleted)
                    return res.status(404)
                        .json({ message: `Não conseguimos encontrar uma Nota pela id: ${id}` });
                return res.status(202).json({ message: 'Nota Fiscal excluída com sucesso.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Orders_service_1.default();
    }
}
exports.default = new OrdersController();
