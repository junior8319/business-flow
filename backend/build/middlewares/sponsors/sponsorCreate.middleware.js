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
const Sponsors_service_1 = __importDefault(require("../../services/Sponsors.service"));
const validateCreateSponsor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const service = new Sponsors_service_1.default();
    const sponsorObject = req.body;
    if (!sponsorObject || Object.keys(sponsorObject).length === 0) {
        return res.status(400).json({
            message: 'Sem dado para cadastrar. Favor preencher os campos.'
        });
    }
    const { name, tradingName } = sponsorObject;
    if (name) {
        const alreadyExists = yield service.existsSponsor(Object.assign(Object.assign({}, sponsorObject), { tradingName: '' }));
        if (alreadyExists)
            return res.status(403)
                .json({
                message: `Já existe parceira registrada com Nome Fantasia ${name}`
            });
    }
    if (tradingName) {
        const alreadyExists = yield service.existsSponsor(Object.assign(Object.assign({}, sponsorObject), { name: '' }));
        if (alreadyExists)
            return res.status(403)
                .json({
                message: `Já existe parceira registrada com Nome ${tradingName}`
            });
    }
    next();
});
exports.default = validateCreateSponsor;
