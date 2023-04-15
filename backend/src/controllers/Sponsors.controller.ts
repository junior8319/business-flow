import SponsorsService from '../services/Sponsors.service';
import ISponsor from '../interfaces/ISponsor';
import { NextFunction, Request, Response } from 'express';

class SponsorsController {
  public service: SponsorsService;

  public sponsorObject!: ISponsor;

  public id!: number;

  constructor() {
    this.service = new SponsorsService();
  }

  public getSponsors = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const sponsorsList: ISponsor[] | null = await this.service.getSponsors();

      if (!sponsorsList) return res.status(404)
        .json({
          message:
            'Não foi possível encontrar Cedentes no banco de dados'
        });

      return res.status(200).json(sponsorsList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getSponsorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.id = Number(req.params.id);

      const sponsor: ISponsor | null = await this.service.getSponsorById(this.id);
      if (!sponsor) return res.status(404)
        .json({
          message:
            `Não foi possível encontrar a Cedente com id ${this.id}`,
        });

      return res.status(200).json(sponsor);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createSponsor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.sponsorObject = req.body;

      const newSponsor: ISponsor | null = await this.service.createSponsor(this.sponsorObject);
      if (!newSponsor) return res.status(400).json({
        message: 'Não foi possível cadastrar a parceira',
      });

      return res.status(201).json(newSponsor);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateSponsor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id || !req.body) return res.status(400)
        .json({ message: 'Sem dado para atualizar.' });

      const sponsorObject = { ...req.body, id };

      const updatedSponsor = await this.service.updateSponsor(sponsorObject);
      if (!updatedSponsor) return res.status(400)
        .json({
          message: 'Não foi possível alterar dados da parceira.'
        });

      return res.status(200).json(updatedSponsor);
    } catch (error) {
      console.log(error);
      next(error);      
    }
  };

  public excludeSponsor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400)
        .json({
          message: 'Favor fornecer um identificador(id) para excluir.',
        });

      this.id = Number(id);
      const sponsorDeleted = await this.service.excludeSponsor(this.id);
      if (!sponsorDeleted) return res.status(404)
        .json({
          message: `Não conseguimos encontrar uma parceira pela id: ${id}`
        });

      return res.status(202).json({ message: 'Parceira excluída com sucesso.' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default new SponsorsController();
