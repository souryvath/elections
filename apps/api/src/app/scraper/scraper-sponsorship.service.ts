import { SponsorshipService } from './../sponsorship/sponsorship.service';
import { Injectable, Logger } from '@nestjs/common';
import slugify from 'slugify';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { NextObserver, Observable } from 'rxjs';
import * as csv from 'csvtojson';

@Injectable()
export class ScraperSponsorshipService {

  readonly URL_SPONSORSHIP = 'https://www.data.gouv.fr/fr/datasets/r/3e34f95f-917f-4d34-9524-eec88284bfd1';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly sponsorshipService: SponsorshipService,
    @InjectQueue('scraper') private scraperQueue: Queue
  ) {
    slugify.extend({ '\'': '-' });
    slugify.extend({ '(': '-' });
    slugify.extend({ ')': '-' });
    slugify.extend({ '[': '' });
    slugify.extend({ ']': '' });
  }

  async addSponsorshipScrapingQueue(): Promise<boolean> {
    try {
      await this.scraperQueue.add('scrapSponsorship');
      return true;
    } catch (error) {
      this.logger.log(`Scrap Sponsorship Failed ${error}`);
      return false;
    }
  }

  scrapSponsorship(): Observable<any> {
    this.logger.log('Scrap Sponsorship Function started');
    this.sponsorshipService.deleteAllSponsorship();
    this.sponsorshipService.createIndexGeo();
    return new Observable((observer: NextObserver<any>) => {
      this.httpService.get(this.URL_SPONSORSHIP).subscribe((response) => {
        csv({
          noheader: true,
          output: 'csv',
          delimiter: ';'
        }).fromString(response.data).then((result) => {
          result.shift();
          result.forEach((element) => {
            const sponsorship = {
              civility: element[0],
              lastName: element[1],
              firstName: element[2],
              mandate: element[3],
              district: element[4],
              department: element[5],
              candidate: element[6],
              slugCandidate: slugify(element[6], { lower: true, remove: /[*+~.()'"!:@/]/g }),
              date: element[7]
            }
            this.sponsorshipService.addSponsorship(sponsorship);
          });
          observer.next(result);
          observer.complete();
          console.log('sponsorship scraping is done');
        });
      });
    });
  }
}
