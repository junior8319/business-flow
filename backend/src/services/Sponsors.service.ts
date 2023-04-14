import { Op } from "sequelize";
import CnpjModel from "../database/models/Cnpj.model";
import SponsorModel from "../database/models/Sponsor.model";
import ISponsor from "../interfaces/ISponsor";

class SponsorsService {
  static model: ISponsor;

  public id!: number;

  constructor() {
    SponsorsService.model = new SponsorModel();
  }

  public getSponsors = async (): Promise<ISponsor[] | null> => {
    const sponsorsList = await SponsorModel.findAll({
      include: [
        { model: CnpjModel, as: 'cnpj' },
      ],
    });

    if (!sponsorsList) return null;

    return sponsorsList.map(sponsorObject => sponsorObject.dataValues);
  };

  public getSponsorById = async (receivedId: number): Promise<ISponsor | null> => {
    this.id = receivedId;
    const sponsor = await SponsorModel.findByPk(
      this.id,
      {
        include: [
          { model: CnpjModel, as: 'cnpj' },
        ],
      }
    );
    if (!sponsor) return null;

    return sponsor.dataValues;
  };

  public existsSponsor = async (receivedSponsor: ISponsor): Promise<boolean> => {
    const { name, tradingName } = receivedSponsor;

    const sponsor = await SponsorModel.findOne({
      where: {
        [Op.or]: [
          { name: (name) ? name : null },
          { tradingName: (tradingName) ? tradingName : null },
        ],
      },
    });

    const exists = !!sponsor;
    
    return exists;
  };

  public createSponsor = async (receivedSponsor: ISponsor): Promise<ISponsor | null> => {
    if (!receivedSponsor) return null;

    const newSponsor = await SponsorModel.create({ ...receivedSponsor });

    return newSponsor.dataValues
  };

  public updateSponsor = async (receivedSponsor: ISponsor): Promise<ISponsor | null> => {
    if (!receivedSponsor || !receivedSponsor.id) return null;

    this.id = receivedSponsor.id;
    const sponsorToUpdate = await SponsorModel.findByPk(this.id);
    if (!sponsorToUpdate) return null;

    await sponsorToUpdate.update(receivedSponsor);

    return sponsorToUpdate.dataValues;
  };

  public excludeSponsor = async (receivedId: number): Promise<ISponsor | null> => {
    if (!receivedId) return null;

    this.id = receivedId;

    const sponsorToExclude = await SponsorModel.findByPk(this.id);
    if (!sponsorToExclude) return null;

    await sponsorToExclude.destroy();

    return sponsorToExclude.dataValues;
  };
}

export default SponsorsService;
