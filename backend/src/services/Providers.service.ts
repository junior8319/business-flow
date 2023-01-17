import { Op } from "sequelize";
import CnpjModel from "../database/models/Cnpj.model";
import ProviderModel from "../database/models/Provider.model";
import IProvider from "../interfaces/IProvider";

class ProvidersService {
  static model: IProvider;

  public id!: number;

  constructor() {
    ProvidersService.model = new ProviderModel();
  }

  public getProviders = async (): Promise<IProvider[] | null> => {
    const providersList = await ProviderModel.findAll({
      include: [
        { model: CnpjModel, as: 'CNPJ' },
      ],
    });

    if (!providersList) return null;

    return providersList.map(providerObject => providerObject.dataValues);
  };

  public getProviderById = async (receivedId: number): Promise<IProvider | null> => {
    this.id = receivedId;
    const provider = await ProviderModel.findByPk(this.id);
    if (!provider) return null;

    return provider;
  };

  public existsProvider = async (receivedProvider: IProvider): Promise<boolean> => {
    const { name, tradingName } = receivedProvider;

    const provider = await ProviderModel.findOne({
      where: {
        [Op.or]: [
          { name: (name) ? name : null },
          { tradingName: (tradingName) ? tradingName : null },
        ],
      },
    });

    const exists = !!provider;
    
    return exists;
  };
}

export default ProvidersService;
