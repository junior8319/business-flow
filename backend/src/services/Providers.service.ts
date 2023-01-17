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
}

export default ProvidersService;
