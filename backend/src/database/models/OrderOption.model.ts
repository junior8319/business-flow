import { DataTypes, Model } from 'sequelize';
import db from '.';
import OrderModel from './Order.model';

class OrderOptionModel extends Model {
  public id!: number;

  public nDup!: string;

  public dVenc!: string;

  public vDup!: string;

  public availableToMarket!: number;

  public orderId!: number;
}

OrderOptionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nDup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dVenc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vDup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableToMarket: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    underscored: false,
    timestamps: true,
    modelName: 'orderOption',
    tableName: 'orderOptions',
  },
);

OrderOptionModel.belongsTo(OrderModel, { foreignKey: 'orderId', as: 'order' });
OrderModel.hasMany(OrderOptionModel, { foreignKey: 'orderId', as: 'order option' });

export default OrderOptionModel;
