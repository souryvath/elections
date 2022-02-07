import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostalCodeController } from './postal-code.controller';
import { PostalCodeService } from './postal-code.service';
import { PostalCodeSchema } from './schemas/postal-code.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PostalCode', schema: PostalCodeSchema }]),
    HttpModule
  ],
  controllers: [
    PostalCodeController,
  ],
  providers: [
    PostalCodeService
  ],
  exports: [
    PostalCodeService
  ]
})
export class PostalCodeModule { }
