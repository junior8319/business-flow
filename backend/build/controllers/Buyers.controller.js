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
const Buyers_service_1 = __importDefault(require("../services/Buyers.service"));
class BuyersController {
    constructor() {
        this.getBuyers = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const buyersList = yield this.service.getBuyers();
                if (!buyersList)
                    return res.status(404)
                        .json({
                        message: 'Não foi possível encontrar Compradoras no banco de dados'
                    });
                return res.status(200).json(buyersList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getBuyerById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.id = Number(req.params.id);
                const buyer = yield this.service.getBuyerById(this.id);
                if (!buyer)
                    return res.status(404)
                        .json({
                        message: `Não foi possível encontrar a Compradora com id ${this.id}`,
                    });
                return res.status(200).json(buyer);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createBuyer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.buyerObject = req.body;
                const newBuyer = yield this.service.createBuyer(this.buyerObject);
                if (!newBuyer)
                    return res.status(400).json({
                        message: 'Não foi possível cadastrar a Compradora',
                    });
                return res.status(201).json(newBuyer);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateBuyer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar.' });
                const buyerObject = Object.assign(Object.assign({}, req.body), { id });
                const updatedBuyer = yield this.service.updateBuyer(buyerObject);
                if (!updatedBuyer)
                    return res.status(400)
                        .json({
                        message: 'Não foi possível alterar dados da Compradora.'
                    });
                return res.status(200).json(updatedBuyer);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.excludeBuyer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Favor fornecer um identificador(id) para excluir.',
                    });
                this.id = Number(id);
                const buyerDeleted = yield this.service.excludeBuyer(this.id);
                if (!buyerDeleted)
                    return res.status(404)
                        .json({
                        message: `Não conseguimos encontrar uma Compradora pela id: ${id}`
                    });
                return res.status(202).json({ message: 'Compradora excluída com sucesso.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Buyers_service_1.default();
    }
}
exports.default = new BuyersController();
