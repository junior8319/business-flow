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
const Sponsors_service_1 = __importDefault(require("../services/Sponsors.service"));
class SponsorsController {
    constructor() {
        this.getSponsors = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sponsorsList = yield this.service.getSponsors();
                if (!sponsorsList)
                    return res.status(404)
                        .json({
                        message: 'Não foi possível encontrar Cedentes no banco de dados'
                    });
                return res.status(200).json(sponsorsList);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.getSponsorById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.id = Number(req.params.id);
                const sponsor = yield this.service.getSponsorById(this.id);
                if (!sponsor)
                    return res.status(404)
                        .json({
                        message: `Não foi possível encontrar a Cedente com id ${this.id}`,
                    });
                return res.status(200).json(sponsor);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.createSponsor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.sponsorObject = req.body;
                const newSponsor = yield this.service.createSponsor(this.sponsorObject);
                if (!newSponsor)
                    return res.status(400).json({
                        message: 'Não foi possível cadastrar a parceira',
                    });
                return res.status(201).json(newSponsor);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.updateSponsor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || !req.body)
                    return res.status(400)
                        .json({ message: 'Sem dado para atualizar.' });
                const sponsorObject = Object.assign(Object.assign({}, req.body), { id });
                const updatedSponsor = yield this.service.updateSponsor(sponsorObject);
                if (!updatedSponsor)
                    return res.status(400)
                        .json({
                        message: 'Não foi possível alterar dados da parceira.'
                    });
                return res.status(200).json(updatedSponsor);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.excludeSponsor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return res.status(400)
                        .json({
                        message: 'Favor fornecer um identificador(id) para excluir.',
                    });
                this.id = Number(id);
                const sponsorDeleted = yield this.service.excludeSponsor(this.id);
                if (!sponsorDeleted)
                    return res.status(404)
                        .json({
                        message: `Não conseguimos encontrar uma parceira pela id: ${id}`
                    });
                return res.status(202).json({ message: 'Parceira excluída com sucesso.' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.service = new Sponsors_service_1.default();
    }
}
exports.default = new SponsorsController();
