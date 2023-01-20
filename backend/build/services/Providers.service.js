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
const Provider_model_1 = __importDefault(require("../database/models/Provider.model"));
class ProvidersService {
    constructor() {
        this.getProviders = () => __awaiter(this, void 0, void 0, function* () {
            const providersList = yield Provider_model_1.default.findAll({
                include: [
                    { model: Cnpj_model_1.default, as: 'cnpj' },
                ],
            });
            if (!providersList)
                return null;
            return providersList.map(providerObject => providerObject.dataValues);
        });
        this.getProviderById = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            this.id = receivedId;
            const provider = yield Provider_model_1.default.findByPk(this.id, {
                include: [
                    { model: Cnpj_model_1.default, as: 'cnpj' },
                ],
            });
            if (!provider)
                return null;
            return provider.dataValues;
        });
        this.existsProvider = (receivedProvider) => __awaiter(this, void 0, void 0, function* () {
            const { name, tradingName } = receivedProvider;
            const provider = yield Provider_model_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { name: (name) ? name : null },
                        { tradingName: (tradingName) ? tradingName : null },
                    ],
                },
            });
            const exists = !!provider;
            return exists;
        });
        this.createProvider = (receivedProvider) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedProvider)
                return null;
            const newProvider = yield Provider_model_1.default.create(Object.assign({}, receivedProvider));
            return newProvider.dataValues;
        });
        this.updateProvider = (receivedProvider) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedProvider || !receivedProvider.id)
                return null;
            this.id = receivedProvider.id;
            const providerToUpdate = yield Provider_model_1.default.findByPk(this.id);
            if (!providerToUpdate)
                return null;
            yield providerToUpdate.update(receivedProvider);
            return providerToUpdate.dataValues;
        });
        this.excludeProvider = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const providerToExclude = yield Provider_model_1.default.findByPk(this.id);
            if (!providerToExclude)
                return null;
            yield providerToExclude.destroy();
            return providerToExclude.dataValues;
        });
        ProvidersService.model = new Provider_model_1.default();
    }
}
exports.default = ProvidersService;
