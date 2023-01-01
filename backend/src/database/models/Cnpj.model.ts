import { DataTypes, Model } from 'sequelize';
import db from '.';
import ProviderModel from './Provider.model';
import BuyerModel from './Buyer.model';
import SponsorModel from './Sponsor.model';

class CnpjModel extends Model {
  public id!: number;

  public cnpj!: string;

  public companyType!: string;
}

CnpjModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    companyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: false,
    timestamps: true,
    modelName: 'cnpj',
    tableName: 'cnpjs',
  },
);

BuyerModel.hasOne(CnpjModel, { foreignKey: 'id', as: 'cnpj' });
CnpjModel.belongsTo(BuyerModel, { foreignKey: 'id', as: 'buyer' });

ProviderModel.hasOne(CnpjModel, { foreignKey: 'id', as: 'cnpj' });
CnpjModel.belongsTo(ProviderModel, { foreignKey: 'id', as: 'provider' });

SponsorModel.hasOne(CnpjModel, { foreignKey: 'id', as: 'cnpj' });
CnpjModel.belongsTo(SponsorModel, { foreignKey: 'id', as: 'sponsor' });

export default CnpjModel;
