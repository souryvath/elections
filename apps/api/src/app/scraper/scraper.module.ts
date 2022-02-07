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

@Module({
  imports: [
    HttpModule,
    PostalCodeModule,
    SponsorshipModule,
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
    ScraperProcessor
  ]
})
export class ScraperModule { }
