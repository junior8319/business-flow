import { Op } from "sequelize";
import OfferModel from "../database/models/Offer.model";
import OrderModel from "../database/models/Order.model";
import SponsorModel from "../database/models/Sponsor.model";
import IOffer from "../interfaces/IOffer";


class OffersService {
  static model: IOffer;

  public id!: number;

  constructor() {
    OffersService.model = new OfferModel();
  }

  public getOffers = async (): Promise<IOffer[] | null> => {
    const offersList = await OfferModel.findAll({
      include: [
        { model: SponsorModel, as: 'sponsor' },
        { model:OrderModel, as: 'order'  },
      ],
    });
    if (!offersList) return null;
    
    return offersList.map(offerObject => offerObject.dataValues);
  };

  public getOfferById = async (receivedId: number): Promise<IOffer | null> => {
    this.id = receivedId;
    const offer = await OfferModel.findByPk(this.id);
    if (!offer) return null;

    return offer;
  };

  static existsOffer = async (receivedOffer: IOffer): Promise<boolean> => {
    const { orderId, sponsorId } = receivedOffer;

    const offer = await OfferModel.findOne({
      where: {
        [Op.and]: [
          { orderId: (orderId) ? orderId : null },
          { sponsorId: (sponsorId) ? sponsorId : null },
        ],
      },
    });

    const exists = !!offer;

    return exists;
  };

  public createOffer = async (receivedOffer: IOffer): Promise<IOffer | null> => {
    if (!receivedOffer) return null;

    const existsOffer = await OffersService.existsOffer(receivedOffer);
    if (existsOffer) return null;

    const newOffer = await OfferModel.create({ ...receivedOffer });
    if (!newOffer) return null;

    return newOffer.dataValues;
  };

  public updateOffer = async (receivedOffer: IOffer): Promise<IOffer | null> => {
    if (!receivedOffer || !receivedOffer.id) return null;

    this.id = receivedOffer.id;
    const offerToUpdate = await OfferModel.findByPk(this.id);
    if (!offerToUpdate) return null;

    if (receivedOffer.orderId && receivedOffer.sponsorId) {
      const alreadyExists = await OffersService.existsOffer(receivedOffer);
      if (alreadyExists) return null;
    }

    await offerToUpdate.update(receivedOffer);

    return offerToUpdate.dataValues;
  };
}

export default OffersService;
