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
const sequelize_1 = require("sequelize");
const Cnpj_model_1 = __importDefault(require("../database/models/Cnpj.model"));
const Buyer_model_1 = __importDefault(require("../database/models/Buyer.model"));
class BuyersService {
    constructor() {
        this.getBuyers = () => __awaiter(this, void 0, void 0, function* () {
            const BuyersList = yield Buyer_model_1.default.findAll({
                include: [
                    { model: Cnpj_model_1.default, as: 'cnpj' },
                ],
            });
            if (!BuyersList)
                return null;
            return BuyersList.map(BuyerObject => BuyerObject.dataValues);
        });
        this.getBuyerById = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            this.id = receivedId;
            const buyer = yield Buyer_model_1.default.findByPk(this.id, {
                include: [
                    { model: Cnpj_model_1.default, as: 'cnpj' },
                ],
            });
            if (!buyer)
                return null;
            return buyer.dataValues;
        });
        this.existsBuyer = (receivedBuyer) => __awaiter(this, void 0, void 0, function* () {
            const { name, tradingName } = receivedBuyer;
            const buyer = yield Buyer_model_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { name: (name) ? name : null },
                        { tradingName: (tradingName) ? tradingName : null },
                    ],
                },
            });
            const exists = !!buyer;
            return exists;
        });
        this.createBuyer = (receivedBuyer) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedBuyer)
                return null;
            const newBuyer = yield Buyer_model_1.default.create(Object.assign({}, receivedBuyer));
            return newBuyer.dataValues;
        });
        this.updateBuyer = (receivedBuyer) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedBuyer || !receivedBuyer.id)
                return null;
            this.id = receivedBuyer.id;
            const buyerToUpdate = yield Buyer_model_1.default.findByPk(this.id);
            if (!buyerToUpdate)
                return null;
            yield buyerToUpdate.update(receivedBuyer);
            return buyerToUpdate.dataValues;
        });
        this.excludeBuyer = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const buyerToExclude = yield Buyer_model_1.default.findByPk(this.id);
            if (!buyerToExclude)
                return null;
            yield buyerToExclude.destroy();
            return buyerToExclude.dataValues;
        });
        BuyersService.model = new Buyer_model_1.default();
    }
}
exports.default = BuyersService;
