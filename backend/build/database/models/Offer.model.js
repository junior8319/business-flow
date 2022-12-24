"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Order_model_1 = __importDefault(require("./Order.model"));
const Sponsor_model_1 = __importDefault(require("./Sponsor.model"));
class OfferModel extends sequelize_1.Model {
}
OfferModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    tax: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tariff: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    adValorem: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    float: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    iof: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expiresIn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    paymentStatusSponsor: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    paymentStatusProvider: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    sponsorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: _1.default,
    underscored: false,
    timestamps: true,
    modelName: 'offer',
    tableName: 'offers',
});
OfferModel.belongsTo(Order_model_1.default, { foreignKey: 'orderId', as: 'order' });
Order_model_1.default.hasMany(OfferModel, { foreignKey: 'orderId', as: 'offers' });
OfferModel.belongsTo(Sponsor_model_1.default, { foreignKey: 'sponsorId', as: 'sponsor' });
Sponsor_model_1.default.hasMany(OfferModel, { foreignKey: 'sponsorId', as: 'offers' });
exports.default = OfferModel;
