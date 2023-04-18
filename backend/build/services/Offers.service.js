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
const Offer_model_1 = __importDefault(require("../database/models/Offer.model"));
const Order_model_1 = __importDefault(require("../database/models/Order.model"));
const Sponsor_model_1 = __importDefault(require("../database/models/Sponsor.model"));
class OffersService {
    constructor() {
        this.getOffers = () => __awaiter(this, void 0, void 0, function* () {
            const offersList = yield Offer_model_1.default.findAll({
                include: [
                    { model: Sponsor_model_1.default, as: 'sponsor' },
                    { model: Order_model_1.default, as: 'order' },
                ],
            });
            if (!offersList)
                return null;
            return offersList.map(offerObject => offerObject.dataValues);
        });
        OffersService.model = new Offer_model_1.default();
    }
}
exports.default = OffersService;
