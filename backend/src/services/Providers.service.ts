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
        { model: CnpjModel, as: 'cnpj' },
      ],
    });

    if (!providersList) return null;

    return providersList.map(providerObject => providerObject.dataValues);
  };

  public getProviderById = async (receivedId: number): Promise<IProvider | null> => {
    this.id = receivedId;
    const provider = await ProviderModel.findByPk(
      this.id,
      {
        include: [
          { model: CnpjModel, as: 'cnpj' },
        ],
      }
    );
    if (!provider) return null;

    return provider.dataValues;
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

  public createProvider = async (receivedProvider: IProvider): Promise<IProvider | null> => {
    if (!receivedProvider) return null;

    const newProvider = await ProviderModel.create({ ...receivedProvider});

    return newProvider.dataValues
  };

  public updateProvider = async (receivedProvider: IProvider): Promise<IProvider | null> => {
    if (!receivedProvider || !receivedProvider.id) return null;

    this.id = receivedProvider.id;
    const providerToUpdate = await ProviderModel.findByPk(this.id);
    if (!providerToUpdate) return null;

    await providerToUpdate.update(receivedProvider);

    return providerToUpdate.dataValues;
  };

  public excludeProvider = async (receivedId: number): Promise<IProvider | null> => {
    if (!receivedId) return null;

    this.id = receivedId;

    const providerToExclude = await ProviderModel.findByPk(this.id);
    if (!providerToExclude) return null;

    await providerToExclude.destroy();

    return providerToExclude.dataValues;
  };
}

export default ProvidersService;
