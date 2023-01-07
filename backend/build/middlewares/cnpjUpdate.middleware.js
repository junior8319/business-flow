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
const Cnpjs_service_1 = __importDefault(require("../services/Cnpjs.service"));
const validateUpdateCnpj = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cnpjObject = req.body;
    const { cnpj, companyType } = cnpjObject;
    if (!cnpjObject || Object.keys(cnpjObject).length === 0)
        return res.status(400)
            .json({
            message: 'Sem dado para atualizar.',
        });
    if (cnpj) {
        const cnpjExists = yield Cnpjs_service_1.default.existsCnpj(cnpj);
        if (cnpjExists)
            return res.status(403)
                .json({ message: `Já existe empresa cadastrada com o CNPJ ${cnpj}` });
    }
    if (cnpj.length === 0 && companyType.length === 0)
        return res.status(400)
            .json({
            message: 'Nada recebido para atualizar.',
        });
    next();
});
exports.default = validateUpdateCnpj;
