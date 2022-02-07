import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SponsorshipController } from './sponsorship.controller';
import { SponsorshipService } from './sponsorship.service';
import { HttpModule } from '@nestjs/axios';
import { SponsorshipSchema } from './schemas/sponsorship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sponsorship', schema: SponsorshipSchema }]),
    HttpModule
  ],
  controllers: [
    SponsorshipController,
  ],
  providers: [
    SponsorshipService
  ],
  exports: [
    SponsorshipService
  ]
})
export class SponsorshipModule { }
