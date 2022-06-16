import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { PostalCode } from './interfaces/postal-code.interface';
import { PostalCodeService } from './postal-code.service';

@Controller()
export class PostalCodeController {
  constructor(
    private readonly postalCodeService: PostalCodeService,
    private readonly httpService: HttpService) { }

  @Get('postal-code')
  async getPostalCode(@Res() res, @Query() params): Promise<PostalCode[]> {
    let postalCode = null;
    if (params.postalCode) {
      postalCode = await this.postalCodeService.getPostalCodes(params.postalCode);
    }
    else if (params.slug) {
      postalCode = await this.postalCodeService.findPostalCodesBySlug(params.slug);
    }
    else if (params.inseeCode) {
      postalCode = await this.postalCodeService.findPostalCodesByInseeCode(params.inseeCode);
    }
    else if (params.departementCode) {
      postalCode = await this.postalCodeService.findPostalCodesByDepartment(params.departementCode);
    }
    else if (!postalCode) {
      postalCode = [];
    }
    return res.status(HttpStatus.OK).json(postalCode);
  }

  @Get('postal-code/nearest/')
  async getTheNearestPostalCodes(@Res() res, @Query() params): Promise<PostalCode[]> {
    if (params.long && params.lat && params.postalCode) {
      const postalCodes = await this.postalCodeService.findPostalCodesByGeolocation(params.postalCode, params.long, params.lat);
      return res.status(HttpStatus.OK).json(postalCodes);
    } else {
      return res.status(HttpStatus.OK).json([]);
    }
  }

  @Get('postal-code/reverse')
  async getReverse(@Res() res, @Query() params): Promise<any> {
    const result = await this.httpService.get(`http://195.154.83.55:7878/reverse/?lon=${params.lon}&lat=${params.lat}`).toPromise();
    return res.status(HttpStatus.OK).json(result.data);
  }


}
