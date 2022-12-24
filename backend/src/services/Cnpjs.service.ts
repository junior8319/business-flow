import CnpjModel from '../database/models/Cnpj.model';
import ICnpj from '../interfaces/ICnpj';

class CnpjsService {
  static model: ICnpj;

  public id!: number;

  public cnpj!: string;

  public companyType!: string;

  constructor() {
    CnpjsService.model = new CnpjModel();
  }

  public getCnpjs = async (): Promise<ICnpj[] | null> => {
    const cnpjsList = await CnpjModel.findAll();
    if (!cnpjsList) return null;

    return cnpjsList.map(cnpjObject => cnpjObject.dataValues);
  };

  public getCnpjById = async (receivedId: number): Promise<ICnpj | null> => {
    this.id = receivedId;
    const cnpj = await CnpjModel.findByPk(this.id);
    if (!cnpj) return null;

    console.log('SERVICE, CNPJ:', cnpj);
    return cnpj;
  };

  static existsCnpj = async (receivedCnpj: string): Promise<boolean> => {
    const cnpj = await CnpjModel.findOne({
      where: { cnpj: receivedCnpj },
    });

    const exists = !!cnpj;

    return exists;
  };

  public createCnpj = async (receivedCnpj: ICnpj): Promise<ICnpj | null> => {
    if (!receivedCnpj) return null;

    this.cnpj = receivedCnpj.cnpj;
    const cnpjExists = await CnpjsService.existsCnpj(this.cnpj);
    if (cnpjExists) return null;

    const newCnpj = await CnpjModel.create({ ...receivedCnpj });
    if (!newCnpj) return null;

    return newCnpj.dataValues;
  };

  public updateCnpj = async (receivedCnpj: ICnpj): Promise<ICnpj | null> => {
    if (!receivedCnpj || !receivedCnpj.id) return null;

    this.id = receivedCnpj.id;
    const cnpjToUpdate = await CnpjModel.findByPk(this.id);
    if (!cnpjToUpdate) return null;

    if (receivedCnpj.cnpj) {
      this.cnpj = receivedCnpj.cnpj;

      const alreadyExists = await CnpjsService.existsCnpj(this.cnpj);
      if (alreadyExists) return null;

      await cnpjToUpdate.update({ cnpj: this.cnpj });
    };

    if (receivedCnpj.companyType) {
      this.companyType = receivedCnpj.companyType;

      await cnpjToUpdate.update({ companyType: this.companyType });
    }

    return cnpjToUpdate.dataValues;
  };

  public excludeCnpj = async (receivedId: number): Promise<ICnpj | null> => {
    if (!receivedId) return null;

    this.id = receivedId;

    const cnpjToExclude = await CnpjModel.findByPk(this.id);
    if (!cnpjToExclude) return null;

    await cnpjToExclude.destroy();

    return cnpjToExclude.dataValues;
  };
}

export default CnpjsService;
