import { ScraperSponsorshipService } from './scraper-sponsorship.service';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ScraperService } from './scraper.service';

@Processor('scraper')
export class ScraperProcessor {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly scraperService: ScraperService,
    private readonly scraperSponsorshipService: ScraperSponsorshipService,
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
}
