import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public phoneNumber!: string;

  public mobile!: string;

  public departament!: string;

  public verificationCode!: string;

  public emailChecked!: number;

  public cashforceAdm!: number;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    departament: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    emailChecked: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    cashforceAdm: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    underscored: false,
    timestamps: true,
    modelName: 'user',
    tableName: 'users',
  },
);

export default UserModel;
