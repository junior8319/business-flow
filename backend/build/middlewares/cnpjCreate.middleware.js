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
Object.defineProperty(exports, "__esModule", { value: true });
const validateCreateCnpj = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cnpjObject = req.body;
    console.log('NO MIDDLEWARE: ', cnpjObject);
    const { cnpj, companyType } = cnpjObject;
    if (!cnpjObject || Object.keys(cnpjObject).length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o CNPJ com cnpj e companyType.',
        });
    if (!cnpj || cnpj.length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o atributo cnpj para cadastrar.',
        });
    if (!companyType || companyType.length === 0)
        return res.status(400)
            .json({
            message: 'É necessário informar o atributo companyType para cadastrar.',
        });
    next();
});
exports.default = validateCreateCnpj;
