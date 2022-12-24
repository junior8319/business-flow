import { DataTypes, Model } from 'sequelize';
import db from '.';

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

export default CnpjModel;
