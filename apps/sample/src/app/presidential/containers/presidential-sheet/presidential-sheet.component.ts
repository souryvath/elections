import { PostalCodeService } from './../../../core/services/postal-code.service';
import { FRANCE_DEPS_LIST } from './../../../shared/constants/departments.constant';
import { FRANCE_REGIONS } from '../../../shared/constants/regions.constant';
import { STAT } from './../../mocks/stat.mock';
import { CITY } from './../../mocks/city.mock';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { RESULT } from '../../mocks/candidate.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PresidentialService } from '../../services/presidential.service';
import { SeoService } from '../../../core/services/seo.service';
import { JsonLdService } from 'ngx-seo';
import { URL_DOMAIN } from '../../../config/url.config';
import { isPlatformBrowser } from '@angular/common';

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
    private readonly presidentialService: PresidentialService,
    private readonly jsonLdService: JsonLdService,
    private readonly seoService: SeoService
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
      this.departement = this.listDepartements.find((item) => item.slug === departementParams);
      this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
      this.result$ = this.presidentialService.getResult(cityParams).pipe(tap((element) => {
        if (element[0].place.location) {
          this.listCity$ = this.presidentialService.getNearestCities(element[0].place.location.coordinates[0], element[0].place.location.coordinates[1]);
        } else {
          this.listCity$ = this.presidentialService.getCities(this.departement.slug, 'departement');
        }
        this.city = element;
        this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement/:city', `${element[0].place.name} (${element[0].place.postalCode})`);
        if (element[0].place.postalCode !== '') {
          this.seoService.setSeoPage(
            `Résultats de l'élection présidentielle 2022 à ${element[0].place.name} (${element[0].place.postalCode}) : 1er et 2ème tour`,
            `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du premier tour et second tour à ${element[0].place.name} et découvrez les résultats des votes et suffrages en direct du ${element[0].place.postalCode}.`
          );
        } else {
          this.seoService.setSeoPage(
            `Résultats de l'élection présidentielle 2022 à ${element[0].place.name} : 1er et 2ème tour`,
            `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du premier tour et second tour à ${element[0].place.name} et découvrez les résultats des votes et suffrages en direct.`
          );
        }
        this.setBreadCrumbJsonLdCity(this.region, this.departement, element[0].place);
      }));
      this.initPageCity();
      return;
    }
    if (regionParams && departementParams) {
      this.result$ = this.presidentialService.getResult(departementParams);
      this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
      this.departement = this.listDepartements.find((item) => item.slug === departementParams);
      this.setBreadCrumbJsonLdDepartement(this.region, this.departement);
      this.initPageDepartement(regionParams);
      return;
    }
    if (regionParams) {
      this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
      this.setBreadCrumbJsonLdRegion(this.region);
      this.initPageRegion(regionParams);
      return;
    }

  }

  initPageCity() {
    this.listDepartements = FRANCE_DEPS_LIST.filter((item) => item.region.code === `FR-${this.region.code}`);
    this.city$ = of({});
    this.place$ = this.city$;
    this.type = 'city';
    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
    this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement', `${this.departement.name} (${this.departement.code.substring(3)})`);
    return;
  }

  initPageDepartement(departementParams: string) {
    this.listDepartements = FRANCE_DEPS_LIST.filter((item) => item.region.code === `FR-${this.region.code}` && item.slug !== departementParams);
    this.listRegions = FRANCE_REGIONS;
    this.departement$ = of(this.departement);
    this.place$ = this.departement$;
    this.type = 'departement';
    console.log('DEPARTEMENT');
    this.listCity$ = this.presidentialService.getCities(this.departement.slug, 'departement');
    this.seoService.setSeoPage(
      `Résultats de l'élection présidentielle 2022 en ${this.departement.name} (${this.departement.code.substring(3)}) : 1er et 2ème tour`,
      `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du premier tour et second tour en ${this.departement.name} et découvrez les résultats des votes et suffrages en direct pour le ${this.departement.code.substring(3)}.`
    );
    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
    this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement', `${this.departement.name} (${this.departement.code.substring(3)})`);
    return;
  }

  initPageRegion(regionParams: string): void {
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
    this.seoService.setSeoPage(
      `Résultats de l'élection présidentielle 2022 en ${this.region.name} : 1er et 2ème tour`,
      `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du 1er et 2nd tour en ${this.region.name} et découvrez les résultats des votes et suffrages en direct pour cette région ${this.region.code}.`
    );
    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
  }

  setBreadCrumbJsonLdCity(region: any, departement: any, city: any): void {
    const breadCrumbObject = this.jsonLdService.getObject('BreadcrumbList', {
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": `${URL_DOMAIN.main}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Election présidentielle 2022`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${region.name}`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/${region.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${departement.slug} (${departement.code})`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/${region.slug}/${departement.slug}`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": `${city.name}`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/${region.slug}/${departement.slug}/${city.slug}`
      },
      ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

  setBreadCrumbJsonLdDepartement(region: any, departement: any): void {
    const breadCrumbObject = this.jsonLdService.getObject('BreadcrumbList', {
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": `${URL_DOMAIN.main}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Election présidentielle 2022`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${region.name}`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/${region.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${departement.slug} (${departement.code})`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/${region.slug}/${departement.slug}`
      },
      ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

  setBreadCrumbJsonLdRegion(region: any): void {
    const breadCrumbObject = this.jsonLdService.getObject('BreadcrumbList', {
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": `${URL_DOMAIN.main}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Election présidentielle 2022`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${region.name}`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/${region.slug}`
      },
      ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }


}
