"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Cnpj_model_1 = __importDefault(require("./Cnpj.model"));
const User_model_1 = __importDefault(require("./User.model"));
const Buyer_model_1 = __importDefault(require("./Buyer.model"));
const Provider_model_1 = __importDefault(require("./Provider.model"));
class OrderModel extends sequelize_1.Model {
}
OrderModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    orderNfId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    orderNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    orderPath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
    },
    orderFileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
    },
    orderOriginalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        unique: true,
    },
    emissionDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    pdfFile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    emitedTo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nNf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    CTE: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    value: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    cnpjId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    buyerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    providerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    orderStatusBuyer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '0',
    },
    orderStatusProvider: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '0',
    },
    deliveryReceipt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    cargoPackingList: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    deliveryCtrc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: _1.default,
    underscored: false,
    timestamps: true,
    modelName: 'order',
    tableName: 'orders',
});
OrderModel.belongsTo(Cnpj_model_1.default, { foreignKey: 'cnpjId', as: 'CNPJ' });
Cnpj_model_1.default.hasMany(OrderModel, { foreignKey: 'cnpjId', as: 'orders' });
OrderModel.belongsTo(User_model_1.default, { foreignKey: 'userId', as: 'user' });
User_model_1.default.hasMany(OrderModel, { foreignKey: 'userId', as: 'orders' });
OrderModel.belongsTo(Buyer_model_1.default, { foreignKey: 'buyerId', as: 'buyer' });
Buyer_model_1.default.hasMany(OrderModel, { foreignKey: 'buyerId', as: 'orders' });
OrderModel.belongsTo(Provider_model_1.default, { foreignKey: 'providerId', as: 'provider' });
Provider_model_1.default.hasMany(OrderModel, { foreignKey: 'providerId', as: 'orders' });
exports.default = OrderModel;
