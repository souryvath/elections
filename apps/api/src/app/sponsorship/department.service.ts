import { DepartmentDTO } from './dto/department.dto';
import { Department } from './interfaces/department.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DepartmentService {

  constructor(@InjectModel('Department') private readonly departmentModel: Model<Department>) {
  }

  async addDepartment(departmentDTO: DepartmentDTO): Promise<DepartmentDTO> {
    const department = new this.departmentModel(departmentDTO);
    return department.save();
  }

  async addManyDepartment(departmentDTO: DepartmentDTO[]): Promise<any> {
    return this.departmentModel.collection.insertMany(departmentDTO);
  }

  async deleteAllDepartment(): Promise<any> {
    return this.departmentModel.deleteMany({}).exec();
  }

  async createIndexGeo(): Promise<any> {
    return await this.departmentModel.collection.createIndex({ "location": "2dsphere" });
  }

  async findAllDepartments(): Promise<Department[]> {
    const departments = await this.departmentModel.find();
    return departments;
  }

  async findDepartments(field: string, value: string): Promise<Department> {
    const query = {};
    query[field] = value;
    const departments = await this.departmentModel.findOne(
      query
    ).exec();
    console.log(departments);
    return departments;
  }

}
