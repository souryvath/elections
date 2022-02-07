import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Sponsorship } from './interfaces/sponsorship.interface';
import { SponsorshipService } from './sponsorship.service';

@Controller()
export class SponsorshipController {
  constructor(
    private readonly sponsorshipService: SponsorshipService,
    ) { }

  @Get('sponsorship')
  async getPostalCode(@Res() res, @Query() params): Promise<Sponsorship[]> {
    let sponsorships = null;
    if (params.field && params.value) {
      console.log(params);
      sponsorships = await this.sponsorshipService.findSponsorships(params.field, params.value);
    } else {
      sponsorships = await this.sponsorshipService.findAllSponsorships();
    }
    return res.status(HttpStatus.OK).json(sponsorships);
  }
}
