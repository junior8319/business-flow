import { DataTypes, Model } from 'sequelize';
import db from '.';
import CnpjModel from './Cnpj.model';
import UserModel from './User.model';
import BuyerModel from './Buyer.model';
import ProviderModel from './Provider.model';

class OrderModel extends Model {
  public id!: number;

  public orderNfId!: string;

  public orderNumber!: string;

  public orderPath!: string;

  public orderFileName!: string;

  public orderOriginalName!: string;

  public emissionDate!: string;

  public pdfFile!: string;

  public emitedTo!: string;

  public nNf!: string;

  public CTE!: string;

  public value!: string;

  public cnpjId!: number;

  public userId!: number;

  public buyerId!: number;

  public providerId!: number;

  public orderStatusBuyer!: string;

  public orderStatusProvider!: string;

  public deliveryReceipt!: string;

  public cargoPackingList!: string;

  public deliveryCtrc!: string;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    orderNfId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderPath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    orderFileName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    orderOriginalName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    emissionDate: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    pdfFile: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    emitedTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nNf: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    CTE: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    cnpjId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    orderStatusBuyer: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0',
    },
    orderStatusProvider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0',
    },
    deliveryReceipt: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    cargoPackingList: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    deliveryCtrc: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    underscored: false,
    timestamps: true,
    modelName: 'order',
    tableName: 'orders',
  },
);

OrderModel.belongsTo(CnpjModel, { foreignKey: 'cnpjId', as: 'CNPJ' });
CnpjModel.hasMany(OrderModel, { foreignKey: 'cnpjId', as: 'orders' });

OrderModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
UserModel.hasMany(OrderModel, { foreignKey: 'userId', as: 'orders' });

OrderModel.belongsTo(BuyerModel, { foreignKey: 'buyerId', as: 'buyer' });
BuyerModel.hasMany(OrderModel, { foreignKey: 'buyerId', as: 'orders' });

OrderModel.belongsTo(ProviderModel, { foreignKey: 'providerId', as: 'provider' });
ProviderModel.hasMany(OrderModel, { foreignKey: 'providerId', as: 'orders' });

export default OrderModel;
