import { PostalCodeService } from './../../../core/services/postal-code.service';
import { FRANCE_DEPS_LIST } from './../../../shared/constants/departments.constant';
import { FRANCE_REGIONS } from '../../../shared/constants/regions.constant';
import { STAT } from './../../mocks/stat.mock';
import { CITY } from './../../mocks/city.mock';
import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { RESULT } from '../../mocks/candidate.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PresidentialService } from '../../services/presidential.service';

@Component({
  selector: 'app-presidential-sheet',
  templateUrl: './presidential-sheet.component.html',
  styleUrls: ['./presidential-sheet.component.scss']
})
export class PresidentialSheetComponent implements OnInit {

  result$: Observable<any>;
  region$: Observable<any>;
  departement$: Observable<any>;
  city$: Observable<any>;
  place$: Observable<any>;
  list: any[];
  listDepartements: any[] = FRANCE_DEPS_LIST;
  listRegions: any[] = FRANCE_REGIONS;
  listCity$: Observable<any>;
  type: string;

  region: any;
  departement: any;
  city: any;

  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly presidentialService: PresidentialService
  ) { }

  ngOnInit(): void {
    const regionParams = this.route.snapshot.params['region'];
    let departementParams = null;
    let cityParams = null;
    if (this.route.snapshot.firstChild) {
      departementParams = this.route.snapshot.firstChild.params['departement'];
    }
    if (this.route.snapshot.firstChild && this.route.snapshot.firstChild.firstChild) {
      cityParams = this.route.snapshot.firstChild.firstChild.params['city'];
    }
    if (regionParams && departementParams && cityParams) {
      this.result$ = this.presidentialService.getResult(cityParams).pipe(tap((element) => {
        if (element[0].place.location) {
          this.listCity$ = this.presidentialService.getNearestCities(element[0].place.location.coordinates[0], element[0].place.location.coordinates[1]);
        } else {
          this.listCity$ = this.presidentialService.getCities(this.departement.slug, 'departement');
        }
        this.city = element;
        this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement/:city', `${element[0].place.name} (${element[0].place.postalCode})`);
      }));
      this.initPageCity(regionParams, departementParams, cityParams);
      return;
    }
    if (regionParams && departementParams) {
      this.result$ = this.presidentialService.getResult(departementParams);
      this.initPageDepartement(regionParams, departementParams);
      return;
    }
    if (regionParams) {

      this.initPageRegion(regionParams);
      return;
    }

  }

  initPageCity(regionParams: string, departementParams: string, cityParams: string) {
    this.departement = this.listDepartements.find((item) => item.slug === departementParams);
    this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
    this.listDepartements = FRANCE_DEPS_LIST.filter((item) => item.region.code === `FR-${this.region.code}`);
    this.city$ = of({});
    this.place$ = this.city$;
    this.type = 'city';
    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
    this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement', `${this.departement.name} (${this.departement.code.substring(3)})`);
    return;
  }

  initPageDepartement(regionParams: string, departementParams: string) {
    this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
    this.departement = this.listDepartements.find((item) => item.slug === departementParams);
    this.listDepartements = FRANCE_DEPS_LIST.filter((item) => item.region.code === `FR-${this.region.code}` && item.slug !== departementParams);
    this.listRegions = FRANCE_REGIONS;
    this.departement$ = of(this.departement);
    this.place$ = this.departement$;
    this.type = 'departement';
    console.log('DEPARTEMENT');
    this.listCity$ = this.presidentialService.getCities(this.departement.slug, 'departement');

    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
    this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement', `${this.departement.name} (${this.departement.code.substring(3)})`);
    return;
  }

  initPageRegion(regionParams: string): void {
    this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
    if (this.region && this.region.slugDep) {
      this.result$ = this.presidentialService.getResult(this.region.slugDep);
    }
    if (this.region && !this.region.slugDep) {
      this.result$ = this.presidentialService.getResult(regionParams);
    }
    if (this.region) {
      this.region$ = of(this.region);
      this.place$ = this.region$;
      this.listDepartements = FRANCE_DEPS_LIST.filter((item) => item.region.code === `FR-${this.region.code}`);
      this.listRegions = FRANCE_REGIONS.filter((item) => item.slug !== regionParams);
      this.listCity$ = this.presidentialService.getCities(this.region.slug, 'region');
      this.type = 'region';
    }
    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
  }

}
