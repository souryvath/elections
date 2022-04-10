import { ScraperPresidentialCityService } from './scraper-presidential-city.service';
import { ScraperPresidentialDepartementService } from './scraper-presidential-departement.service';
import { ScraperSponsorshipService } from './scraper-sponsorship.service';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ScraperService } from './scraper.service';
import { ScraperPresidentialRegionService } from './scraper-presidential-region.service';
import { PresidentialService } from '../presidential/presidential.service';
import { ScraperPresidentialNationalService } from './scraper-presidential-national.service';

@Processor('scraper')
export class ScraperProcessor {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly presidentialService: PresidentialService,
    private readonly scraperService: ScraperService,
    private readonly scraperSponsorshipService: ScraperSponsorshipService,
    private readonly scraperPresidentialRegionService: ScraperPresidentialRegionService,
    private readonly scraperPresidentialDepartementService: ScraperPresidentialDepartementService,
    private readonly scraperPresidentialCityService: ScraperPresidentialCityService,
    private readonly scraperPresidentialNationalService: ScraperPresidentialNationalService
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`)
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}`)
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
  }

  @Process('scrapPostalCode')
  async scrapPostalCode(): Promise<any> {
    this.logger.log('Scraper Postal Code Processing');
    try {
      await this.scraperService.scrapPostalCode().toPromise();
    } catch (error) {
      this.logger.error('Scraper Postal Code Failed', error.stack)
      throw error
    }
  }

  @Process('scrapSponsorship')
  async scrapSponsorship(): Promise<any> {
    this.logger.log('Scraper Sponsorship Processing');
    try {
      await this.scraperSponsorshipService.scrapSponsorship().toPromise();
    } catch (error) {
      this.logger.error('Scraper Sponsorship Failed', error.stack)
      throw error
    }
  }

  @Process('scrapPresidential')
  async scrapPresidential(): Promise<any> {
    this.logger.log('Scraper Presidential Region Processing');
    this.presidentialService.deleteAllPresidential();
    try {
      const execScraper = async () => {
        await Promise.all([,
          this.scraperPresidentialCityService.scrapPresidentialCity(1).toPromise(),
          // this.scraperPresidentialCityService.scrapPresidentialCity(2).toPromise(),
        ]);
      };
      execScraper().then(() => {
        console.log(`SCRAPER PRESIDENTIAL DONE : ${new Date()}`);
       });

    } catch (error) {
      this.logger.error('Scraper Presidential Region Failed', error.stack)
      throw error
    }
  }

  @Process('scrapPresidentialRegion')
  async scrapPresidentialRegion(): Promise<any> {
    this.logger.log('Scraper Presidential Region Processing');
    try {
      const execScraper = async () => {
        await Promise.all([
          this.scraperPresidentialNationalService.scrapPresidentialNational(1).toPromise(),
          // this.scraperPresidentialNationalService.scrapPresidentialNational(2).toPromise(),
          this.scraperPresidentialRegionService.scrapPresidentialRegion(1).toPromise(),
          // this.scraperPresidentialRegionService.scrapPresidentialRegion(2).toPromise(),
          this.scraperPresidentialDepartementService.scrapPresidentialDepartement(1).toPromise(),
          // this.scraperPresidentialDepartementService.scrapPresidentialDepartement(2).toPromise()
        ]);
      };
      execScraper().then(() => {
        console.log(`SCRAPER PRESIDENTIAL DONE : ${new Date()}`);
       });

    } catch (error) {
      this.logger.error('Scraper Presidential Region Failed', error.stack)
      throw error
    }
  }
}


