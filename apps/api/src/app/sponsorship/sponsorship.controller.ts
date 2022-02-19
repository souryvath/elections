import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { FRANCE_DEPS } from './departments.constant';
import { Sponsorship } from './interfaces/sponsorship.interface';
import { SponsorshipService } from './sponsorship.service';

@Controller()
export class SponsorshipController {
  constructor(
    private readonly sponsorshipService: SponsorshipService,
    private readonly candidateService: CandidateService,
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

  @Get('sponsorship/department')
  async getDepartment(@Res() res, @Query() params): Promise<Sponsorship[]> {
    if (params.slugCandidate) {
      const sponsorships = await this.sponsorshipService.findDistinctDepartment();
      return res.status(HttpStatus.OK).json(sponsorships.filter((item => item._id.slugCandidate === params.slugCandidate)));
    }
  }

  @Post('sponsorship/sitemap/')
  async sitemapPostalCodeStation(@Res() res, @Query() params): Promise<PostalCode[]> {
    const candidates = await this.candidateService.rankingCandidate();
    let sitemap = '';
    candidates.forEach((element) => {
      sitemap += `<url><loc>https://www.les-elections.fr/parrainages-presidentielle-2022/candidats/${element.slug}</loc></url>`
    });
    FRANCE_DEPS.forEach((element) => {
      sitemap += `<url><loc>https://www.les-elections.fr/parrainages-presidentielle-2022/departements/${element.slug}</loc></url>`
    });
    sitemap += `<url><loc>https://www.les-elections.fr/parrainages-presidentielle-2022/candidats</loc></url>`
    sitemap += `<url><loc>https://www.les-elections.fr/parrainages-presidentielle-2022/departements</loc></url>`
    sitemap += `<url><loc>https://www.les-elections.fr/parrainages-presidentielle-2022</loc></url>`
    sitemap += `<url><loc>https://www.les-elections.fr/parrainages-presidentielle-2022</loc></url>`
    return res.status(HttpStatus.OK).json(sitemap);
  }
}
