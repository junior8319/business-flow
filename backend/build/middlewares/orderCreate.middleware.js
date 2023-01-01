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
const validateCreateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderObject = req.body;
    const { orderNfId, orderNumber, emitedTo, orderStatusBuyer, orderStatusProvider, } = orderObject;
    const requiredKeys = [
        'orderNfId',
        'orderNumber',
        'emitedTo',
        'orderStatusBuyer',
        'orderStatusProvider',
    ];
    const uniqueKeys = [
        'orderNfId',
        'orderPath',
        'orderFileName',
        'orderOriginalName',
    ];
    const receivedKeys = Object.keys(orderObject);
    if (!orderObject ||
        receivedKeys.length === 0 ||
        requiredKeys.some(key => !receivedKeys.includes(key)))
        return res.status(400)
            .json({
            message: `Os campos ${requiredKeys} são obrigatórios no cadastro`,
        });
    if (orderNfId.length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o atributo orderNfId para cadastrar.',
        });
    if (orderNumber.length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o atributo orderNumber para cadastrar.',
        });
    if (emitedTo.length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o atributo emitedTo para cadastrar.',
        });
    if (orderStatusBuyer.length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o atributo orderStatusBuyer para cadastrar.',
        });
    if (orderStatusProvider.length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o atributo orderStatusProvider para cadastrar.',
        });
    if (receivedKeys.some(key => uniqueKeys.includes(key))) {
        const orderExists = yield Orders_service_1.default.existsOrder(orderObject);
        if (orderExists)
            return res.status(403)
                .json({ message: `Já existe nota fiscal cadastrada com os dados ${JSON.stringify(orderObject)}` });
    }
    next();
});
exports.default = validateCreateOrder;
