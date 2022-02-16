import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CandidateDTO } from './dto/candidate.dto';
import { Candidate } from './interfaces/candidate.interface';

@Injectable()
export class CandidateService {

  constructor(@InjectModel('Candidate') private readonly candidateModel: Model<Candidate>) {
  }

  async addCandidate(candidateDTO: CandidateDTO): Promise<CandidateDTO> {
    const candidate = new this.candidateModel(candidateDTO);
    return candidate.save();
  }

  async addManyCandidate(candidateDTO: CandidateDTO[]): Promise<any> {
    return this.candidateModel.collection.insertMany(candidateDTO);
  }

  async deleteAllCandidate(): Promise<any> {
    return this.candidateModel.deleteMany({}).exec();
  }

  async createIndexGeo(): Promise<any> {
    return await this.candidateModel.collection.createIndex({ "location": "2dsphere" });
  }

  async findAllCandidates(): Promise<Candidate[]> {
    const candidates = await this.candidateModel.find();
    return candidates;
  }

  async findCandidate(field: string, value: string): Promise<Candidate> {
    const query = {};
    query[field] = value;
    const candidate = await this.candidateModel.findOne(
      query
    ).exec();
    return candidate;
  }

  async rankingCandidate(): Promise<Candidate[]> {
    const candidates = await this.candidateModel.find({}, { name: 1, slugName: 1, numberSponsorships: 1, _id: 0 }).exec();
    return (candidates.sort((a, b) => (a.numberSponsorships < b.numberSponsorships) ? 1 : -1));
  }
}
