import { PresidentialService } from './presidential.service';
import { PresidentialController } from './presidential.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { PresidentialSchema } from './schemas/presidential.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Presidential', schema: PresidentialSchema }]),
    HttpModule
  ],
  controllers: [
    PresidentialController
  ],
  providers: [
    PresidentialService
  ],
  exports: [
    PresidentialService
  ]
})
export class PresidentialModule { }
