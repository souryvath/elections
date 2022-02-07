import { Controller, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
  constructor(private scraperService: ScraperService) { }

  @Post('scraper/postal-code')
  scrapPostalCode(): Promise<any> {
    return this.scraperService.addPostalCodeScrapingQueue();
  }
}
