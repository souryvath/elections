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
    let presidentials = await this.presidentialService.findRegions(params.round);
    return res.status(HttpStatus.OK).json(presidentials);
  }

  @Get('presidential/departements')
  async getDepartements(@Res() res, @Query() params): Promise<Presidential[]> {
    let presidentials = await this.presidentialService.findDepartements(params.round);
    return res.status(HttpStatus.OK).json(presidentials);
  }

  @Get('presidential/candidates')
  async getCandidates(@Res() res, @Query() params): Promise<Presidential[]> {
    if (params.type === 'region') {
      let presidentials = await this.presidentialService.findRegionsByCandidates(params.candidate);
      return res.status(HttpStatus.OK).json(presidentials);
    }
    if (params.type === 'departement') {
      let presidentials = await this.presidentialService.findDepartementsByCandidates(params.candidate);
      return res.status(HttpStatus.OK).json(presidentials);
    }
    if (params.type === 'national') {
      let presidentials = await this.presidentialService.findNationalByCandidates(params.candidate);
      return res.status(HttpStatus.OK).json(presidentials);
    }
    return res.status(HttpStatus.OK).json([]);
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
