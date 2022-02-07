import { ScraperSponsorshipService } from './scraper-sponsorship.service';
import { Controller, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
  constructor(
    private scraperService: ScraperService,
    private scraperSponsorshipService: ScraperSponsorshipService
    ) { }

  @Post('scraper/postal-code')
  scrapPostalCode(): Promise<any> {
    return this.scraperService.addPostalCodeScrapingQueue();
  }

  @Post('scraper/sponsorship')
  scrapSponsorship(): Promise<any> {
    return this.scraperSponsorshipService.addSponsorshipScrapingQueue();
  }
}
