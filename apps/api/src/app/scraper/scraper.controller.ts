import { ScraperSponsorshipService } from './scraper-sponsorship.service';
import { Controller, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperPresidentialRegionService } from './scraper-presidential-region.service';

@Controller()
export class ScraperController {
  constructor(
    private scraperService: ScraperService,
    private scraperSponsorshipService: ScraperSponsorshipService,
    private readonly scraperPresidentialRegionService: ScraperPresidentialRegionService
    ) { }

  @Post('scraper/postal-code')
  scrapPostalCode(): Promise<any> {
    return this.scraperService.addPostalCodeScrapingQueue();
  }

  @Post('scraper/sponsorship')
  scrapSponsorship(): Promise<any> {
    return this.scraperSponsorshipService.addSponsorshipScrapingQueue();
  }

  @Post('scraper/presidential')
  scrapPresidential(): Promise<any> {
    return this.scraperPresidentialRegionService.addPresidentialScrapingQueue();
  }

  @Post('scraper/presidential-region')
  scrapPresidentialRegion(): Promise<any> {
    return this.scraperPresidentialRegionService.addPresidentialRegionScrapingQueue();
  }
}
