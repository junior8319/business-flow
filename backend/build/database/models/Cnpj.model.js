"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Provider_model_1 = __importDefault(require("./Provider.model"));
class CnpjModel extends sequelize_1.Model {
}
CnpjModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    cnpj: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    companyType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    underscored: false,
    timestamps: true,
    modelName: 'cnpj',
    tableName: 'cnpjs',
});
// BuyerModel.hasOne(CnpjModel, { foreignKey: 'id', as: 'cnpj' });
// CnpjModel.belongsTo(BuyerModel, { foreignKey: 'id', as: 'buyer' });
CnpjModel.hasOne(Provider_model_1.default, { foreignKey: 'cnpjId', as: 'provider' });
Provider_model_1.default.belongsTo(CnpjModel, { foreignKey: 'cnpjId', as: 'cnpj' });
// SponsorModel.hasOne(CnpjModel, { foreignKey: 'id', as: 'cnpj' });
// CnpjModel.belongsTo(SponsorModel, { foreignKey: 'id', as: 'sponsor' });
exports.default = CnpjModel;
