import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Sponsorship } from './interfaces/sponsorship.interface';
import { SponsorshipService } from './sponsorship.service';

@Controller()
export class SponsorshipController {
  constructor(
    private readonly sponsorshipService: SponsorshipService,
    ) { }

  @Get('sponsorship')
  async getSponsorship(@Res() res, @Query() params): Promise<Sponsorship[]> {
    let sponsorships = null;
    if (params.field && params.value) {
      sponsorships = await this.sponsorshipService.findSponsorships(params.field, params.value);
    } else {
      sponsorships = await this.sponsorshipService.findAllSponsorships();
    }
    return res.status(HttpStatus.OK).json(sponsorships);
  }

  @Get('sponsorship/candidates')
  async getCandidates(@Res() res, @Query() params): Promise<Sponsorship[]> {
    if (params.query) {
      const sponsorships = await this.sponsorshipService.findCandidates(params.query);
      return res.status(HttpStatus.OK).json(sponsorships);
    }
    return res.status(HttpStatus.OK).json(null);
  }

  @Get('sponsorship/ranking')
  async getRanking(@Res() res, @Query() params): Promise<Sponsorship[]> {
    if (params.slugCandidate) {
      const sponsorships = await this.sponsorshipService.findRanking();
      return res.status(HttpStatus.OK).json(sponsorships);
    }
    return res.status(HttpStatus.OK).json([]);
  }

  @Get('sponsorship/department')
  async getDepartment(@Res() res, @Query() params): Promise<Sponsorship[]> {
    if (params.slugCandidate) {
      const sponsorships = await this.sponsorshipService.findDistinctDepartment();
      return res.status(HttpStatus.OK).json(sponsorships.filter((item => item._id.slugCandidate === params.slugCandidate)));
    }
  }
}
