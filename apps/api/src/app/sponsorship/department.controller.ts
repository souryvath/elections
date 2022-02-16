import { DepartmentService } from './department.service';
import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { Department } from './interfaces/department.interface';

@Controller()
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    ) { }


  @Get('department')
  async getSponsorship(@Res() res, @Query() params): Promise<Department[]> {
    let sponsorships = null;
    if (params.field && params.value) {
      sponsorships = await this.departmentService.findDepartments(params.field, params.value);
    } else {
      sponsorships = await this.departmentService.findAllDepartments();
    }
    return res.status(HttpStatus.OK).json(sponsorships);
  }
}
