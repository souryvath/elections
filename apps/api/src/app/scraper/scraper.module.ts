import { ScraperPresidentialNationalService } from './scraper-presidential-national.service';
import { ScraperPresidentialCityService } from './scraper-presidential-city.service';
import { ScraperPresidentialDepartementService } from './scraper-presidential-departement.service';
import { PresidentialModule } from './../presidential/presidential.module';
import { SponsorshipModule } from './../sponsorship/sponsorship.module';
import { PostalCodeModule } from './../postal-code/postal-code.module';
import { ScraperService } from './scraper.service';
import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { BullModule } from '@nestjs/bull';
import { ScraperProcessor } from './scraper.processor';
import { environment } from '../../environments/environment';
import { HttpModule } from '@nestjs/axios';
import { ScraperSponsorshipService } from './scraper-sponsorship.service';
import { ScraperPresidentialRegionService } from './scraper-presidential-region.service';

@Module({
  imports: [
    HttpModule,
    PostalCodeModule,
    SponsorshipModule,
    PresidentialModule,
    BullModule.registerQueueAsync({
      name: 'scraper',
      useFactory: () => ({
        redis: {
          host: environment.production === true ?
          `${process.env.CONTAINER_NAME_REDIS}`
          : `localhost`,
          port: 6379,
        },
      }),
    }),
  ],
  controllers: [
    ScraperController
  ],
  providers: [
    ScraperService,
    ScraperSponsorshipService,
    ScraperProcessor,
    ScraperPresidentialRegionService,
    ScraperPresidentialCityService,
    ScraperPresidentialDepartementService,
    ScraperPresidentialNationalService
  ]
})
export class ScraperModule { }
