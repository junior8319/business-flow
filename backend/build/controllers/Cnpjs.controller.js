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
class CnpjsController {
    constructor() {
        this.getCnpjs = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cnpjsList = yield this.service.getCnpjs();
                if (!cnpjsList)
                    return res.status(404)
                        .json({ message: 'Não foi possível encontrar CNPJ\'s no banco de dados' });
                return res.status(200).json(cnpjsList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getCnpjById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.id = Number(req.params.id);
                const cnpj = yield this.service.getCnpjById(this.id);
                if (!cnpj)
                    return res.status(404)
                        .json({ message: 'Não foi possível encontrar o CNPJ no banco de dados' });
                return res.status(200).json(cnpj);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createCnpj = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.cnpjObject = req.body;
                const newCnpj = yield this.service.createCnpj(this.cnpjObject);
                if (!newCnpj)
                    return res.status(400).json({
                        message: `Não foi possível cadastrar o CNPJ.`,
                    });
                return res.status(201).json(newCnpj);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateCnpj = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar.' });
                const cnpjObject = Object.assign(Object.assign({}, req.body), { id });
                const updatedCnpj = yield this.service.updateCnpj(cnpjObject);
                if (!updatedCnpj)
                    return res.status(403)
                        .json({
                        message: 'Não foi possível alterar o CNPJ' +
                            ' pode ser que já exista um CNPJ cadastrado com este número.'
                    });
                return res.status(200).json(updatedCnpj);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.excludeCnpj = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Favor fornecer um identificador(id) para excluir.',
                    });
                this.id = Number(id);
                const cnpjDeleted = yield this.service.excludeCnpj(this.id);
                if (!cnpjDeleted)
                    return res.status(404)
                        .json({ message: `Não conseguimos encontrar um CNPJ pela id: ${id}` });
                return res.status(202).json({ message: 'CNPJ excluído com sucesso.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Cnpjs_service_1.default();
    }
}
exports.default = new CnpjsController();
