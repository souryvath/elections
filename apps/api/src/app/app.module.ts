import { PostalCodeModule } from './postal-code/postal-code.module';
import { ScraperModule } from './scraper/scraper.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { SocialNetworkModule } from './social-network/social-network.module';
import { SponsorshipModule } from './sponsorship/sponsorship.module';
import { PresidentialModule } from './presidential/presidential.module';

const mongo = environment.production === true ?
`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.CONTAINER_NAME_MONGODB}:27017/${process.env.MONGO_INITDB_DATABASE}`
: `mongodb://localhost:27017/${process.env.MONGO_INITDB_DATABASE}`;

@Module({
  imports: [
    MongooseModule.forRoot(mongo),
    PostalCodeModule,
    ScraperModule,
    SponsorshipModule,
    PresidentialModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
