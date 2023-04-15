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
const Sponsor_model_1 = __importDefault(require("../database/models/Sponsor.model"));
class SponsorsService {
    constructor() {
        this.getSponsors = () => __awaiter(this, void 0, void 0, function* () {
            const sponsorsList = yield Sponsor_model_1.default.findAll({
                include: [
                    { model: Cnpj_model_1.default, as: 'cnpj' },
                ],
            });
            if (!sponsorsList)
                return null;
            return sponsorsList.map(sponsorObject => sponsorObject.dataValues);
        });
        this.getSponsorById = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            this.id = receivedId;
            const sponsor = yield Sponsor_model_1.default.findByPk(this.id, {
                include: [
                    { model: Cnpj_model_1.default, as: 'cnpj' },
                ],
            });
            if (!sponsor)
                return null;
            return sponsor.dataValues;
        });
        this.existsSponsor = (receivedSponsor) => __awaiter(this, void 0, void 0, function* () {
            const { name, tradingName } = receivedSponsor;
            const sponsor = yield Sponsor_model_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { name: (name) ? name : null },
                        { tradingName: (tradingName) ? tradingName : null },
                    ],
                },
            });
            const exists = !!sponsor;
            return exists;
        });
        this.createSponsor = (receivedSponsor) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedSponsor)
                return null;
            const newSponsor = yield Sponsor_model_1.default.create(Object.assign({}, receivedSponsor));
            return newSponsor.dataValues;
        });
        this.updateSponsor = (receivedSponsor) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedSponsor || !receivedSponsor.id)
                return null;
            this.id = receivedSponsor.id;
            const sponsorToUpdate = yield Sponsor_model_1.default.findByPk(this.id);
            if (!sponsorToUpdate)
                return null;
            yield sponsorToUpdate.update(receivedSponsor);
            return sponsorToUpdate.dataValues;
        });
        this.excludeSponsor = (receivedId) => __awaiter(this, void 0, void 0, function* () {
            if (!receivedId)
                return null;
            this.id = receivedId;
            const sponsorToExclude = yield Sponsor_model_1.default.findByPk(this.id);
            if (!sponsorToExclude)
                return null;
            yield sponsorToExclude.destroy();
            return sponsorToExclude.dataValues;
        });
        SponsorsService.model = new Sponsor_model_1.default();
    }
}
exports.default = SponsorsService;
