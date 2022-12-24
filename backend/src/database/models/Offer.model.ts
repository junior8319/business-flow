import { DataTypes, Model } from 'sequelize';
import db from '.';
import OrderModel from './Order.model';
import SponsorModel from './Sponsor.model';

class OfferModel extends Model {
  public id!: number;

  public tax!: string;

  public tariff!: string;

  public adValorem!: string;

  public float!: string;

  public iof!: string;

  public expiresIn!: Date;

  public paymentStatusSponsor!: number;

  public paymentStatusProvider!: number;

  public orderId!: number;

  public sponsorId!: number;
}

OfferModel.init(
  {
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tax: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    tariff: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    adValorem: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    float: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    iof: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    expiresIn: {
      type:DataTypes.DATE,
      allowNull: false,
    },
    paymentStatusSponsor: {
      type:DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    paymentStatusProvider: {
      type:DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    orderId: {
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    sponsorId: {
      type:DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    underscored: false,
    timestamps: true,
    modelName: 'offer',
    tableName: 'offers',
  },
);

OfferModel.belongsTo(OrderModel, { foreignKey: 'orderId', as: 'order' });
OrderModel.hasMany(OfferModel, { foreignKey: 'orderId', as: 'offers' });

OfferModel.belongsTo(SponsorModel, {  foreignKey: 'sponsorId', as: 'sponsor' });
SponsorModel.hasMany(OfferModel, { foreignKey: 'sponsorId', as: 'offers' });

export default OfferModel;
