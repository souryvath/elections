import { Presidential } from './interfaces/presidential.interface';
import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { PresidentialService } from './presidential.service';

@Controller()
export class PresidentialController {
  constructor(
    private readonly presidentialService: PresidentialService,
    ) { }


  @Get('presidential')
  async getSponsorship(@Res() res, @Query() params): Promise<Presidential[]> {
    let presidentials = null;
    if (params.slug) {
      presidentials = await this.presidentialService.findPresidentialBySlug(params.slug);
    }
    else if (params.field && params.value) {
      presidentials = await this.presidentialService.findPresidential(params.field, params.value);
    } else {
      presidentials = await this.presidentialService.findAllPresidentials();
    }
    return res.status(HttpStatus.OK).json(presidentials);
  }

  @Get('presidential/places')
  async getPlaces(@Res() res, @Query() params): Promise<Presidential[]> {
    let presidentials = await this.presidentialService.findPlaces(params.slug);
    return res.status(HttpStatus.OK).json(presidentials);
  }

  @Get('presidential/regions')
  async getRegions(@Res() res, @Query() params): Promise<Presidential[]> {
    let presidentials = await this.presidentialService.findRegions();
    return res.status(HttpStatus.OK).json(presidentials);
  }

  @Get('presidential/cities')
  async getCities(@Res() res, @Query() params): Promise<Presidential[]> {
    let presidentials = null;
    if (params.zone) {
      presidentials = await this.presidentialService.findCities(params.value, params.zone);
    }
    if (params.long && params.lat) {
      console.log(params.long);
      presidentials = await this.presidentialService.findPostalCodesByGeolocation(params.long, params.lat);
    }
    return res.status(HttpStatus.OK).json(presidentials);
  }

  @Get('presidential/most-voted')
  async getMostVotedCities(@Res() res): Promise<Presidential[]> {
    let presidentials = null;
    presidentials = await this.presidentialService.findMostVotedCities();
    return res.status(HttpStatus.OK).json(presidentials);
  }
}
