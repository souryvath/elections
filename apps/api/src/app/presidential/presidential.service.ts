import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PipelineStage } from 'mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { PresidentialDTO } from './dto/presidential.dto';
import { Presidential } from './interfaces/presidential.interface';

@Injectable()
export class PresidentialService {

  constructor(@InjectModel('Presidential') private readonly presidentialModel: Model<Presidential>) {
  }

  async addPresidential(presidentialDTO: PresidentialDTO): Promise<PresidentialDTO> {
    const presidential = new this.presidentialModel(presidentialDTO);
    return presidential.save();
  }

  async addManyPresidential(presidentialDTO: PresidentialDTO[]): Promise<any> {
    return this.presidentialModel.collection.insertMany(presidentialDTO);
  }

  async deleteAllPresidential(): Promise<any> {
    return this.presidentialModel.deleteMany({}).exec();
  }

  async createIndexGeo(): Promise<any> {
    return await this.presidentialModel.collection.createIndex({ "location": "2dsphere" });
  }

  async findAllPresidentials(): Promise<Presidential[]> {
    const presidentials = await this.presidentialModel.find();
    return presidentials;
  }

  async findPresidential(field: string, value: string): Promise<Presidential[]> {
    const query = {};
    query[field] = value;
    const presidential = await this.presidentialModel.find(
      query
    ).exec();
    return presidential;
  }

  async findPresidentialBySlug(value: string): Promise<Presidential[]> {
    const presidential = await this.presidentialModel.find(
      {
        'place.slug': value
      }
    ).exec();
    return presidential;
  }

  async findRegions(round: string): Promise<Presidential[]> {
    const gquery = [
      { $match: { 'place.id': { $exists: true }, "round": round } },
      {
        "$addFields": {
          "candidate": {
            "$arrayElemAt": [
              "$candidates",
              { "$indexOfArray": ["$candidates.pctVotesOnExprimated", { "$max": "$candidates.pctVotesOnExprimated" }] }
            ]
          },
        }
      },
      {
        $group: {
          _id: '$code',
          name: { $first: '$name' },
          slug: { $first: '$place.slug' },
          candidate: { $first: '$candidate' }
        }
      },
      { $sort: { "slug": 1 } }
    ] as PipelineStage[];
    const cities = await this.presidentialModel.aggregate(gquery).exec();
    return cities;
  }

  async findRegionsByCandidates(candidate: string): Promise<Presidential[]> {
    const gquery = [
      { $match: { 'place.id': { $exists: true }} },
      {
        "$addFields": {
          "candidate": {
            "$arrayElemAt": [
              "$candidates",
              { "$indexOfArray": ["$candidates.slug", candidate] }
            ]
          },
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: '$place.slug',
          round: 1,
          candidate: {
            name: '$candidate.lastName',
            slug: '$candidate.slug',
            pctVotesOnExprimated: '$candidate.pctVotesOnExprimated'
          }
        },
      },
      { $sort: { "slug": 1 } }
    ] as PipelineStage[];
    const cities = await this.presidentialModel.aggregate(gquery).exec();
    return cities;
  }

  async findDepartements(round: string): Promise<Presidential[]> {
    const gquery = [
      { $match: { 'place.region': { $exists: true }, "round": round } },
      {
        "$addFields": {
          "candidate": {
            "$arrayElemAt": [
              "$candidates",
              { "$indexOfArray": ["$candidates.pctVotesOnExprimated", { "$max": "$candidates.pctVotesOnExprimated" }] }
            ]
          },
        }
      },
      {
        $group: {
          _id: '$code',
          nbrVotes: { $first: '$nbrVotes' },
          name: { $first: '$name' },
          slug: { $first: '$place.slug' },
          regionSlug: { $first: '$place.region.slug' },
          candidate: { $first: '$candidate' }
        }
      },
      { $sort: { "slug": 1 } }
    ] as PipelineStage[];
    const cities = await this.presidentialModel.aggregate(gquery).exec();
    return cities;
  }

  async findDepartementsByCandidates(candidate: string): Promise<Presidential[]> {
    const gquery = [
      { $match: { 'place.region': { $exists: true }} },
      {
        "$addFields": {
          "candidate": {
            "$arrayElemAt": [
              "$candidates",
              { "$indexOfArray": ["$candidates.slug", candidate] }
            ]
          },
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: '$place.slug',
          round: 1,
          code: '$place.code',
          regionSlug: '$place.region.slug',
          candidate: {
            name: '$candidate.lastName',
            slug: '$candidate.slug',
            pctVotesOnExprimated: '$candidate.pctVotesOnExprimated'
          }
        },
      },
      { $sort: { "slug": 1 } }
    ] as PipelineStage[];
    const cities = await this.presidentialModel.aggregate(gquery).exec();
    return cities;
  }

  async findNationalByCandidates(candidate: string): Promise<Presidential[]> {
    const gquery = [
      { $match: { 'place.name': 'France' } },
      {
        "$addFields": {
          "candidate": {
            "$arrayElemAt": [
              "$candidates",
              { "$indexOfArray": ["$candidates.slug", candidate] }
            ]
          },
        }
      },
      {
        $project: {
          _id: 1,
          name: { $concat: [ "$candidate.firstName", " ", "$candidate.lastName" ]},
          slug: 1,
          round: 1,
          candidates: 1
        },
      },
      { $sort: { "slug": 1 } }
    ] as PipelineStage[];
    const cities = await this.presidentialModel.aggregate(gquery).exec();
    return cities;
  }

  async findCities(value: string, zone: string): Promise<Presidential[]> {
    if (zone === 'region') {
      const gquery = [
        { $match: { 'place.departement.region.slug': value, "round": '1' } },
        {
          $group: {
            _id: '$code',
            nbrVotes: { $first: '$nbrVotes' },
            name: { $first: '$name' },
            slug: { $first: '$place.slug' },
            departementSlug: { $first: '$place.departement.slug' },
            postalCode: { $first: '$place.postalCode' },
            regionSlug: { $first: '$place.departement.region.slug' }
          },
        },
        { $sort: { "nbrVotes": -1 } },
        { $limit: 25 },
        { $sort: { "slug": 1 } },
      ] as PipelineStage[];
      const cities = await this.presidentialModel.aggregate(gquery).exec();
      return cities;
    }
    else if (zone === 'departement') {
      const gquery = [
        { $match: { 'place.departement.slug': value, "round": '1' } },
        {
          $group: {
            _id: '$code',
            nbrVotes: { $first: '$nbrVotes' },
            name: { $first: '$name' },
            slug: { $first: '$place.slug' },
            departementSlug: { $first: '$place.departement.slug' },
            postalCode: { $first: '$place.postalCode' },
            regionSlug: { $first: '$place.departement.region.slug' }
          },
        },
        { $sort: { "nbrVotes": -1 } },
        { $limit: 25 },
        { $sort: { "slug": 1 } },
      ] as PipelineStage[];
      const cities = await this.presidentialModel.aggregate(gquery).exec();
      return cities;
    }
    return [];
  }

  async findPlaces(text: string): Promise<Presidential[]> {
    let postalCodes = [];
    if (/^\d+$/.test(text)) {
      postalCodes = await this.presidentialModel.find(
        { "place.postalCode": { $regex: `^${text}` }, "round": '1' }, { "place": 1, "_id": 0 }
      ).exec();
    } else {
      const newText = slugify(text, { lower: true }).split("-");
      const indexSt = newText.findIndex(element => element === 'saint');
      const indexSte = newText.findIndex(element => element === 'sainte');
      if (indexSt !== -1) {
        newText[indexSt] = 'st';
      }
      if (indexSte !== -1) {
        newText[indexSte] = 'ste';
      }
      const textJoin = newText.join(' ');
      postalCodes = await this.presidentialModel.find(
        { "place.slug": { $regex: `^${slugify(textJoin, { lower: true })}` }, "round": '1' }, { "place": 1, "_id": 0 }
      ).exec();
    }
    return postalCodes.sort((a, b) => (a.place.slug > b.place.slug) ? 1 : -1);
  }

  async findPostalCodesByGeolocation(long: string, lat: string): Promise<Presidential[]> {
    const gquery = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [Number(long), Number(lat)]
          },
          minDistance: 0.001,
          maxDistance: 100000, //100 KM
          distanceMultiplier: 0.001,
          distanceField: "dist.calculated",
          spherical: true
        }
      },
      { $match: { 'round': '1' } },
      { $limit: 25 },
      { $sort: { "name": -1 } },
      {
        $group: {
          _id: '$code',
          nbrVotes: { $first: '$nbrVotes' },
          name: { $first: '$name' },
          slug: { $first: '$place.slug' },
          departementSlug: { $first: '$place.departement.slug' },
          postalCode: { $first: '$place.postalCode' },
          regionSlug: { $first: '$place.departement.region.slug' }
        },
      },
    ] as PipelineStage[];
    const postalCodes = await this.presidentialModel.aggregate(gquery).exec();
    return postalCodes;
  }

  async findMostVotedCities(): Promise<Presidential[]> {
    const gquery = [
      { $match: { 'place.postalCode': { $exists: true }, "round": '1', 'place.departement.region.slug': { $ne: 'francais-etranger' } } },
      {
        $group: {
          _id: '$code',
          nbrVotes: { $first: '$nbrVotes' },
          name: { $first: '$name' },
          slug: { $first: '$place.slug' },
          departementSlug: { $first: '$place.departement.slug' },
          postalCode: { $first: '$place.postalCode' },
          regionSlug: { $first: '$place.departement.region.slug' }
        },
      },
      { $sort: { "nbrVotes": -1 } },
      { $limit: 50 },
      { $sort: { "slug": 1 } },
    ] as PipelineStage[];
    const postalCodes = await this.presidentialModel.aggregate(gquery).exec();
    return postalCodes;
  }

}
