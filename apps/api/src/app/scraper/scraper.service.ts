import { PostalCodeService } from './../postal-code/postal-code.service';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, NextObserver } from 'rxjs';
import * as csv from 'csvtojson';
import slugify from 'slugify';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { FRANCE_DEPS } from '../sponsorship/departments.constant';
import { FRANCE_REGIONS_LIST } from '../sponsorship/regions.constant';

@Injectable()
export class ScraperService {

  readonly URL_POSTAL_CODE = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/laposte_hexasmal.csv';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly postalCodeService: PostalCodeService,
    @InjectQueue('scraper') private scraperQueue: Queue
  ) {
    slugify.extend({ '\'': '-' });
    slugify.extend({ '(': '-' });
    slugify.extend({ ')': '-' });
    slugify.extend({ '[': '' });
    slugify.extend({ ']': '' });
  }

  async addPostalCodeScrapingQueue(): Promise<boolean> {
    try {
      await this.scraperQueue.add('scrapPostalCode');
      return true;
    } catch (error) {
      this.logger.log(`Scrap Postal Code Failed ${error}`);
      return false;
    }
  }

  scrapPostalCode(): Observable<any> {
    this.logger.log('Scrap Postal Code Function started');
    this.postalCodeService.deleteAllPostalCode();
    this.postalCodeService.createIndexGeo();
    return new Observable((observer: NextObserver<any>) => {
      this.httpService.get(this.URL_POSTAL_CODE).subscribe((response) => {
        csv({
          noheader: true,
          output: 'csv',
          delimiter: ';'
        }).fromString(response.data).then((result) => {
          result.shift();
          result.forEach((element) => {
            const latitude = element[5].split(',')[0];
            const longitude = element[5].split(',')[1];
            const slug = `${element[1]}-${element[2]}`;
            const departement = FRANCE_DEPS.find((item) => item.code.substring(3) === element[2].substring(0, item.code.substring(3).length));
            const postalCode = {
              name: element[1],
              postalCode: element[2],
              location: {
                type: 'Point',
                coordinates: [longitude ? longitude : 0, latitude ? latitude : 0]
              },
              slug: `${slugify(slug, { lower: true, remove: /[*+~.()'"!:@/]/g })}`,
              departement,
              longitude: longitude ? longitude : 0,
              latitude: latitude ? latitude : 0,
              insee: element[0]
            };
            this.postalCodeService.addPostalCode(postalCode);
          });
          observer.next(result);
          observer.complete();
          console.log('postal code scraping is done');
        });
      });
    });
  }


}
