"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Order_model_1 = __importDefault(require("./Order.model"));
class OrderOptionModel extends sequelize_1.Model {
}
OrderOptionModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nDup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dVenc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    vDup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    availableToMarket: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: _1.default,
    underscored: false,
    timestamps: true,
    modelName: 'orderOption',
    tableName: 'orderOptions',
});
OrderOptionModel.belongsTo(Order_model_1.default, { foreignKey: 'orderId', as: 'order' });
Order_model_1.default.hasMany(OrderOptionModel, { foreignKey: 'orderId', as: 'order option' });
exports.default = OrderOptionModel;
