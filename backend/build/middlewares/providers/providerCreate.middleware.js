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
const Providers_service_1 = __importDefault(require("../../services/Providers.service"));
const validateCreateProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const service = new Providers_service_1.default();
    const providerObject = req.body;
    if (!providerObject || Object.keys(providerObject).length === 0) {
        return res.status(400).json({
            message: 'Sem dado para cadastrar. Favor preencher os campos.'
        });
    }
    const { name, tradingName } = providerObject;
    if (name) {
        const alreadyExists = yield service.existsProvider(Object.assign(Object.assign({}, providerObject), { tradingName: '' }));
        if (alreadyExists)
            return res.status(403)
                .json({
                message: `Já existe Cedente registrada com Nome Fantasia ${name}`
            });
    }
    if (tradingName) {
        const alreadyExists = yield service.existsProvider(Object.assign(Object.assign({}, providerObject), { name: '' }));
        if (alreadyExists)
            return res.status(403)
                .json({
                message: `Já existe Cedente registrada com Nome ${tradingName}`
            });
    }
    next();
});
exports.default = validateCreateProvider;
