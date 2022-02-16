import { CandidateController } from './candidate.controller';
import { CandidateSchema } from './schemas/candidate.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SponsorshipController } from './sponsorship.controller';
import { SponsorshipService } from './sponsorship.service';
import { HttpModule } from '@nestjs/axios';
import { SponsorshipSchema } from './schemas/sponsorship.schema';
import { DepartmentService } from './department.service';
import { DepartmentSchema } from './schemas/department.schema';
import { DepartmentController } from './department.controller';
import { CandidateService } from './candidate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sponsorship', schema: SponsorshipSchema }]),
    MongooseModule.forFeature([{ name: 'Department', schema: DepartmentSchema }]),
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
    HttpModule
  ],
  controllers: [
    SponsorshipController,
    DepartmentController,
    CandidateController
  ],
  providers: [
    SponsorshipService,
    CandidateService,
    DepartmentService
  ],
  exports: [
    SponsorshipService,
    DepartmentService,
    CandidateService
  ]
})
export class SponsorshipModule { }
