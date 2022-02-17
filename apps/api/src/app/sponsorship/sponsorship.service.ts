import { SponsorshipDTO } from './dto/sponsorship.dto';
import { Sponsorship } from './interfaces/sponsorship.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';

@Injectable()
export class SponsorshipService {

  constructor(@InjectModel('Sponsorship') private readonly sponsorshipModel: Model<Sponsorship>) {
  }

  async addSponsorship(sponsorshipDTO: SponsorshipDTO): Promise<SponsorshipDTO> {
    const postalCode = new this.sponsorshipModel(sponsorshipDTO);
    return postalCode.save();
  }

  async addManySponsorship(sponsorshipDTO: SponsorshipDTO[]): Promise<any> {
    const newPostalCode = new this.sponsorshipModel(sponsorshipDTO);
    return newPostalCode.collection.insertMany(sponsorshipDTO);
  }

  async deleteAllSponsorship(): Promise<any> {
    return this.sponsorshipModel.deleteMany({}).exec();
  }

  async createIndexGeo(): Promise<any> {
    return await this.sponsorshipModel.collection.createIndex({ "location": "2dsphere" });
  }

  async findAllSponsorships(): Promise<Sponsorship[]> {
    const sponsorships = await this.sponsorshipModel.find();
    return sponsorships;
  }

  async findCandidates(query: string): Promise<Sponsorship[]> {
    const regex = new RegExp(`${slugify(query, { lower: true, remove: /[*+~.()'"!:@/]/g })}`);
    const candidates = (await this.findDistinctCandidates()).filter(value => regex.test(value.slug));
    return candidates;
  }

  async findDistinctCandidates() {
    let allCandidates = await this.sponsorshipModel.find().distinct('candidate').exec();
    allCandidates = allCandidates.map((element) => {
      const newObject = {
        name: element,
        slug: `${slugify(element, { lower: true, remove: /[*+~.()'"!:@/]/g })}`,
      }
      return (newObject);
    });
    return allCandidates;
  }

  async findDistinctDepartment() {
    let allCandidates = await this.sponsorshipModel.aggregate([{
      $group: {
        _id: {
          "departmentCode": "$departmentCode",
          "slugCandidate": "$slugCandidate"
        },
        "departmentCode": {
          $first: "$departmentCode"
        },
        "department": {
          $first: "$department"
        },
        "value": {
          $first: "$departmentNumberSponsorship"
        }
      }
    }]);
    return allCandidates;
  }

  async findSponsorships(field: string, value: string): Promise<Sponsorship[]> {
    const query = {};
    query[field] = value;
    const sponsorships = await this.sponsorshipModel.find(
      query
    ).exec();
    return sponsorships;
  }

}
