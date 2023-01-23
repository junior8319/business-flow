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
const Providers_service_1 = __importDefault(require("../services/Providers.service"));
class ProvidersController {
    constructor() {
        this.getProviders = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const providersList = yield this.service.getProviders();
                if (!providersList)
                    return res.status(404)
                        .json({
                        message: 'Não foi possível encontrar Cedentes no banco de dados'
                    });
                return res.status(200).json(providersList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getProviderById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.id = Number(req.params.id);
                const provider = yield this.service.getProviderById(this.id);
                if (!provider)
                    return res.status(404)
                        .json({
                        message: `Não foi possível encontrar a Cedente com id ${this.id}`,
                    });
                return res.status(200).json(provider);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createProvider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.providerObject = req.body;
                const newProvider = yield this.service.createProvider(this.providerObject);
                if (!newProvider)
                    return res.status(400).json({
                        message: 'Não foi possível cadastrar a cedente',
                    });
                return res.status(201).json(newProvider);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateProvider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar.' });
                const providerObject = Object.assign(Object.assign({}, req.body), { id });
                const updatedProvider = yield this.service.updateProvider(providerObject);
                if (!updatedProvider)
                    return res.status(400)
                        .json({
                        message: 'Não foi possível alterar dados da Cedente.'
                    });
                return res.status(200).json(updatedProvider);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.excludeProvider = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Favor fornecer um identificador(id) para excluir.',
                    });
                this.id = Number(id);
                const providerDeleted = yield this.service.excludeProvider(this.id);
                if (!providerDeleted)
                    return res.status(404)
                        .json({
                        message: `Não conseguimos encontrar uma Cedente pela id: ${id}`
                    });
                return res.status(202).json({ message: 'Cedente excluída com sucesso.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Providers_service_1.default();
    }
}
exports.default = new ProvidersController();
