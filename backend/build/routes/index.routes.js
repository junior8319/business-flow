"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorsRouter = exports.buyersRouter = exports.providersRouter = exports.ordersRouter = exports.cnpjsRouter = void 0;
const cnpjs_routes_1 = __importDefault(require("./cnpjs.routes"));
exports.cnpjsRouter = cnpjs_routes_1.default;
const orders_routes_1 = __importDefault(require("./orders.routes"));
exports.ordersRouter = orders_routes_1.default;
const providers_routes_1 = __importDefault(require("./providers.routes"));
exports.providersRouter = providers_routes_1.default;
const buyers_routes_1 = __importDefault(require("./buyers.routes"));
exports.buyersRouter = buyers_routes_1.default;
const sponsor_routes_1 = __importDefault(require("./sponsor.routes"));
exports.sponsorsRouter = sponsor_routes_1.default;
