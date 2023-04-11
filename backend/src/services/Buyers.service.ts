import { Op } from "sequelize";
import CnpjModel from "../database/models/Cnpj.model";
import BuyerModel from "../database/models/Buyer.model";
import IBuyer from "../interfaces/IBuyer";

class BuyersService {
  static model: BuyerModel;

  public id!: number;

  constructor() {
    BuyersService.model = new BuyerModel();
  }

  public getBuyers = async (): Promise<IBuyer[] | null> => {
    const BuyersList = await BuyerModel.findAll({
      include: [
        { model: CnpjModel, as: 'cnpj' },
      ],
    });

    if (!BuyersList) return null;

    return BuyersList.map(BuyerObject => BuyerObject.dataValues);
  };

  public getBuyerById = async (receivedId: number): Promise<IBuyer | null> => {
    this.id = receivedId;
    const buyer = await BuyerModel.findByPk(
      this.id,
      {
        include: [
          { model: CnpjModel, as: 'cnpj' },
        ],
      }
    );
    if (!buyer) return null;

    return buyer.dataValues;
  };

  public existsBuyer = async (receivedBuyer: IBuyer): Promise<boolean> => {
    const { name, tradingName } = receivedBuyer;

    const buyer = await BuyerModel.findOne({
      where: {
        [Op.or]: [
          { name: (name) ? name : null },
          { tradingName: (tradingName) ? tradingName : null },
        ],
      },
    });

    const exists = !!buyer;
    
    return exists;
  };

  public createBuyer = async (receivedBuyer: IBuyer): Promise<IBuyer | null> => {
    if (!receivedBuyer) return null;

    const newBuyer = await BuyerModel.create({ ...receivedBuyer});

    return newBuyer.dataValues
  };

  public updateBuyer = async (receivedBuyer: IBuyer): Promise<IBuyer | null> => {
    if (!receivedBuyer || !receivedBuyer.id) return null;

    this.id = receivedBuyer.id;
    const buyerToUpdate = await BuyerModel.findByPk(this.id);
    if (!buyerToUpdate) return null;

    await buyerToUpdate.update(receivedBuyer);

    return buyerToUpdate.dataValues;
  };

  public excludeBuyer = async (receivedId: number): Promise<IBuyer | null> => {
    if (!receivedId) return null;

    this.id = receivedId;

    const buyerToExclude = await BuyerModel.findByPk(this.id);
    if (!buyerToExclude) return null;

    await buyerToExclude.destroy();

    return buyerToExclude.dataValues;
  };
}

export default BuyersService;
