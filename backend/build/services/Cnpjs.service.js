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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Cnpj_model_1 = __importDefault(require("../database/models/Cnpj.model"));
class CnpjsService {
    constructor() {
        this.getCnpjs = () => __awaiter(this, void 0, void 0, function* () {
            const cnpjsList = yield Cnpj_model_1.default.findAll();
            if (!cnpjsList)
                return null;
            return cnpjsList.map(cnpjObject => cnpjObject.dataValues);
        });
        this.getCnpjById = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            this.id = receivedId;
            const cnpj = yield Cnpj_model_1.default.findByPk(this.id);
            if (!cnpj)
                return null;
            console.log('SERVICE, CNPJ:', cnpj);
            return cnpj;
        });
        this.createCnpj = (receivedCnpj) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedCnpj)
                return null;
            this.cnpj = receivedCnpj.cnpj;
            const cnpjExists = yield CnpjsService.existsCnpj(this.cnpj);
            if (cnpjExists)
                return null;
            const newCnpj = yield Cnpj_model_1.default.create(Object.assign({}, receivedCnpj));
            if (!newCnpj)
                return null;
            return newCnpj.dataValues;
        });
        this.updateCnpj = (receivedCnpj) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedCnpj || !receivedCnpj.id)
                return null;
            this.id = receivedCnpj.id;
            const cnpjToUpdate = yield Cnpj_model_1.default.findByPk(this.id);
            if (!cnpjToUpdate)
                return null;
            if (receivedCnpj.cnpj && receivedCnpj.cnpj !== cnpjToUpdate.cnpj) {
                this.cnpj = receivedCnpj.cnpj;
                const alreadyExists = yield CnpjsService.existsCnpj(this.cnpj);
                if (alreadyExists)
                    return null;
                yield cnpjToUpdate.update({ cnpj: this.cnpj });
            }
            ;
            if (receivedCnpj.companyType && receivedCnpj.companyType !== cnpjToUpdate.companyType) {
                this.companyType = receivedCnpj.companyType;
                yield cnpjToUpdate.update({ companyType: this.companyType });
            }
            return cnpjToUpdate.dataValues;
        });
        this.excludeCnpj = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const cnpjToExclude = yield Cnpj_model_1.default.findByPk(this.id);
            if (!cnpjToExclude)
                return null;
            yield cnpjToExclude.destroy();
            return cnpjToExclude.dataValues;
        });
        CnpjsService.model = new Cnpj_model_1.default();
    }
}
_a = CnpjsService;
CnpjsService.existsCnpj = (receivedCnpj) => __awaiter(void 0, void 0, void 0, function* () {
    const cnpj = yield Cnpj_model_1.default.findOne({
        where: { cnpj: receivedCnpj },
    });
    const exists = !!cnpj;
    return exists;
});
exports.default = CnpjsService;
