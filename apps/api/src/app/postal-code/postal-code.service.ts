import { PostalCode } from './interfaces/postal-code.interface';
import { PostalCodeDTO } from './dto/postal-code.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import slugify from 'slugify';
@Injectable()
export class PostalCodeService {

  constructor(@InjectModel('PostalCode') private readonly postalCodeModel: Model<PostalCode>) {
    slugify.extend({ '\'': '-' });
    slugify.extend({ '(': '-' });
    slugify.extend({ ')': '-' });
    slugify.extend({ '[': '' });
    slugify.extend({ ']': '' });
  }

  async addPostalCode(postalCodeDTO: PostalCodeDTO): Promise<PostalCodeDTO> {
    const postalCode = new this.postalCodeModel(postalCodeDTO);
    return postalCode.save();
  }

  // post many PostalCodes
  async addManyPostalCode(postalCodeDTO: PostalCodeDTO[]): Promise<any> {
    const newPostalCode = new this.postalCodeModel(postalCodeDTO);
    return newPostalCode.collection.insertMany(postalCodeDTO);
  }

  async deleteAllPostalCode(): Promise<any> {
    return this.postalCodeModel.deleteMany({}).exec();
  }

  async getPostalCodes(text: string): Promise<PostalCode[]> {
    let postalCodes = [];
    if (/^\d+$/.test(text)) {
      postalCodes = await this.postalCodeModel.find(
        { "postalCode": { $regex: `^${text}` } }
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
      postalCodes = await this.postalCodeModel.find(
        { "slug": { $regex: `^${slugify(textJoin, { lower: true })}` } }
      ).exec();
    }
    return postalCodes.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  async findPostalCodesByGeolocation(postalCode: string, long: string, lat: string): Promise<PostalCode[]> {
    const postalCodesTmp = await this.getPostalCodes(postalCode);
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
      {
        $project: {
          "weight": {
            $cond: {
              if: { $eq: ["$postalCode", postalCode] },
              then: 10,
              else: 2
            }
          },
          "document": "$$ROOT"
        },
      },
      { $sort: { "weight": -1 } },
      {
        $replaceRoot: { newRoot: "$document" }
      },
      { $limit: postalCodesTmp.length + 6 }
    ] as PipelineStage[];
    const postalCodes = await this.postalCodeModel.aggregate(gquery).exec();
    return this.removeDuplicatesBy(x => x.name, postalCodes.sort((a, b) => (a.name > b.name) ? 1 : -1));
  }

  async findPostalCodesBySlug(slug: string): Promise<PostalCode> {
    const postalCodes = await this.postalCodeModel.findOne(
      { "slug": slug }
    ).exec();
    return postalCodes;
  }

  async findPostalCodesByInseeCode(inseeCode: string): Promise<PostalCode> {
    const postalCodes = await this.postalCodeModel.findOne(
      { "insee": inseeCode }
    ).exec();
    return postalCodes;
  }

  async findPostalCodesByDepartment(departementCode: string): Promise<PostalCode[]> {
    console.log(departementCode);
    const postalCodes = await this.postalCodeModel.find(
      {"postalCode": {$regex: '^' + departementCode, $options: 'i'}}
    ).exec();
    return postalCodes;
  }

  async findAllPostalCodes(): Promise<PostalCode[]> {
    const postalCodes = await this.postalCodeModel.find();
    return postalCodes;
  }

  async createIndexGeo(): Promise<any> {
    return await this.postalCodeModel.collection.createIndex({ "location": "2dsphere" });
  }

  private removeDuplicatesBy(keyFn, array) {
    const mySet = new Set();
    return array.filter(function (x) {
      const key = keyFn(x), isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

}
