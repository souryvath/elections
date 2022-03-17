import { CANDIDATES_PRESIDENTIAL } from './candidates.constants';
import { Presidential } from './interfaces/presidential.interface';
import { Controller, Get, Res, Query, HttpStatus, Post } from '@nestjs/common';
import { PresidentialService } from './presidential.service';
import { FRANCE_REGIONS_LIST } from '../sponsorship/regions.constant';
import { FRANCE_DEPS } from '../sponsorship/departments.constant';

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
    if (params.slug === '') {
      return res.status(HttpStatus.OK).json([]);
    }
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

  @Post('presidentiel/sitemap/')
  async sitemapPostalCodeStation(@Res() res, @Query() params): Promise<Presidential[]> {
    if (params.type === 'region') {
      let postalCodes = FRANCE_REGIONS_LIST;
      let sitemap = `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">`;
      postalCodes.forEach((element) => {
        sitemap += `<url><loc>https://www.les-elections.fr/resultats-presidentielle-2022/${element.slug}</loc></url>`
      });
      sitemap += '</urlset>';
      return res.status(HttpStatus.OK).json(sitemap);
    }
    if (params.type === 'departement') {
      let postalCodes = FRANCE_DEPS;
      let sitemap = `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">`;
      postalCodes.forEach((element) => {
        sitemap += `<url><loc>https://www.les-elections.fr/resultats-presidentielle-2022/${element.region.slug}/${element.slug}</loc></url>`
      });
      sitemap += '</urlset>';
      return res.status(HttpStatus.OK).json(sitemap);
    }
    if (params.type === 'ville') {
      let postalCodes = await this.presidentialService.findAllCities();
      let sitemap = `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">`;
      postalCodes.forEach((element) => {

        sitemap += `<url><loc>https://www.les-elections.fr/resultats-presidentielle-2022/${element.place.departement.region.slug}/${element.place.departement.slug}/${element.place.slug}</loc></url>`
      });
      sitemap += '</urlset>';
      return res.status(HttpStatus.OK).json(sitemap);
    }
    if (params.type === 'candidate') {
      let postalCodes = CANDIDATES_PRESIDENTIAL;
      let sitemap = `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">`;
      postalCodes.forEach((element) => {
        sitemap += `<url><loc>https://www.les-elections.fr/resultats-presidentielle-2022/candidats/${element.slug}</loc></url>`
      });
      sitemap += '</urlset>';
      return res.status(HttpStatus.OK).json(sitemap);
    }

  }

}
