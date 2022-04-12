import { FRANCE_DEPS_LIST } from './../../../shared/constants/departments.constant';
import { FRANCE_REGIONS } from '../../../shared/constants/regions.constant';
import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PresidentialService } from '../../services/presidential.service';
import { SeoService } from '../../../core/services/seo.service';
import { JsonLdService } from 'ngx-seo';
import { URL_DOMAIN } from '../../../config/url.config';

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
  resultSheet: any;
  link: string;
  roundParams: string;
  roundParamsSeo = {
    '1er-tour': {
      'title': '1er tour',
      'ariane': '1er tour',
      'desc': 'premier tour'
    },
    '2nd-tour': {
      'title': '2nd tour (ou 2ème tour)',
      'ariane': '2nd tour',
      'desc': 'second tour'
    },
    '1er et 2ème tour': {

      'title': '1er et 2nd tour (ou 2ème tour)',
      'desc': 'premier tour et second tour'
    }
  }


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
      if (this.route.snapshot.firstChild.params['departement']) {
        if (this.route.snapshot.firstChild.params['departement'] !== '1er-tour' && this.route.snapshot.firstChild.params['departement'] !== '2nd-tour') {
          departementParams = this.route.snapshot.firstChild.params['departement'];
        } else {
          this.roundParams = this.route.snapshot.firstChild.params['departement'];
          this.seoService.createLinkForCanonicalURL(this.roundParams);
        }
      }
    }
    if (this.route.snapshot.firstChild && this.route.snapshot.firstChild.firstChild) {
      if (this.route.snapshot.firstChild.firstChild.params['city'] !== '1er-tour' && this.route.snapshot.firstChild.firstChild.params['city'] !== '2nd-tour') {
        cityParams = this.route.snapshot.firstChild.firstChild.params['city'];
      } else {
        this.roundParams = this.route.snapshot.firstChild.firstChild.params['city'];
        this.seoService.createLinkForCanonicalURL(this.roundParams);
      }
    }
    if (this.route.snapshot.firstChild && this.route.snapshot.firstChild.firstChild && this.route.snapshot.firstChild.firstChild.firstChild) {
      this.roundParams = this.route.snapshot.firstChild.firstChild.firstChild.params['round'];
      this.seoService.createLinkForCanonicalURL(this.roundParams);
    }
    if (regionParams && departementParams && cityParams) {
      this.link = `${regionParams}/${departementParams}/${cityParams}`;
      this.departement = this.listDepartements.find((item) => item.slug === departementParams);
      this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
      this.result$ = this.presidentialService.getResult(cityParams).pipe(tap((element) => {
        this.resultSheet = element;
        if (element[0].place.location) {
          this.listCity$ = this.presidentialService.getNearestCities(element[0].place.location.coordinates[0], element[0].place.location.coordinates[1]);
        } else {
          this.listCity$ = this.presidentialService.getCities(this.departement.slug, 'departement');
        }
        this.city = element;
        let roundParams = this.roundParams;
        if (!roundParams) {
          roundParams = '1er et 2ème tour';
        }
        if (element[0].place.postalCode !== '') {
          this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement/:city', `${element[0].place.name} (${element[0].place.postalCode})`);
          this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement/:city/:round', `${this.roundParamsSeo[roundParams]['ariane']}`);
          this.seoService.setSeoPage(
            `Résultats de l'élection présidentielle 2022 à ${element[0].place.name} (${element[0].place.postalCode}) : ${this.roundParamsSeo[roundParams]['title']}`,
            `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du ${this.roundParamsSeo[roundParams]['desc']} à ${element[0].place.name} et découvrez les résultats des votes et suffrages en direct du ${element[0].place.postalCode}.`
          );
        } else {
          this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement/:city', `${element[0].place.name}`);
          this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement/:city/:round', `${this.roundParamsSeo[roundParams]['ariane']}`);
          this.seoService.setSeoPage(
            `Résultats de l'élection présidentielle 2022 à ${element[0].place.name} : ${this.roundParamsSeo[roundParams]['title']}`,
            `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du ${this.roundParamsSeo[roundParams]['desc']} à ${element[0].place.name} et découvrez les résultats des votes et suffrages en direct.`
          );
        }
        this.setBreadCrumbJsonLdCity(this.region, this.departement, element[0].place);
      }));
      this.initPageCity();
      return;
    }
    if (regionParams && departementParams) {
      this.link = `${regionParams}/${departementParams}`;
      this.result$ = this.presidentialService.getResult(departementParams).pipe(tap((element) => {
        this.resultSheet = element;
      }));
      this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
      this.departement = this.listDepartements.find((item) => item.slug === departementParams);
      this.setBreadCrumbJsonLdDepartement(this.region, this.departement);
      this.initPageDepartement(departementParams, this.roundParams);
      return;
    }
    if (regionParams) {
      this.link = regionParams;
      this.region = FRANCE_REGIONS.find((item) => item.slug === regionParams);
      this.setBreadCrumbJsonLdRegion(this.region);
      this.initPageRegion(regionParams, this.roundParams);
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

  initPageDepartement(departementParams: string, roundParams: string) {
    this.listDepartements = FRANCE_DEPS_LIST.filter((item) => item.region.code === `FR-${this.region.code}` && item.slug !== departementParams);
    this.listRegions = FRANCE_REGIONS;
    this.departement$ = of(this.departement);
    this.place$ = this.departement$;
    this.type = 'departement';
    this.listCity$ = this.presidentialService.getCities(this.departement.slug, 'departement');
    if (!roundParams) {
      roundParams = '1er et 2ème tour';
    }
    this.seoService.setSeoPage(
      `Résultats de l'élection présidentielle 2022 en ${this.departement.name} (${this.departement.code.substring(3)}) : ${this.roundParamsSeo[roundParams]['title']}`,
      `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du ${this.roundParamsSeo[roundParams]['desc']} en ${this.departement.name} et découvrez les résultats des votes et suffrages en direct pour le ${this.departement.code.substring(3)}.`
    );
    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
    this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement', `${this.departement.name} (${this.departement.code.substring(3)})`);
    this.breadcrumbService.set('resultats-presidentielle-2022/:region/:departement/:round', `${this.roundParamsSeo[roundParams]['ariane']}`);
    return;
  }

  initPageRegion(regionParams: string, roundParams: string): void {
    if (this.region && this.region.slugDep) {
      this.result$ = this.presidentialService.getResult(this.region.slugDep).pipe(tap((element) => {
        this.resultSheet = element;
      }));
    }
    if (this.region && !this.region.slugDep) {
      this.result$ = this.presidentialService.getResult(regionParams).pipe(tap((element) => {
        this.resultSheet = element;
      }));
    }
    if (this.region) {
      this.region$ = of(this.region);
      this.place$ = this.region$;
      this.listDepartements = FRANCE_DEPS_LIST.filter((item) => item.region.code === `FR-${this.region.code}`);
      this.listRegions = FRANCE_REGIONS.filter((item) => item.slug !== regionParams);
      this.listCity$ = this.presidentialService.getCities(this.region.slug, 'region');
      this.type = 'region';
    }
    if (!roundParams) {
      roundParams = '1er et 2ème tour';
    }
    this.seoService.setSeoPage(
      `Résultats de l'élection présidentielle 2022 en ${this.region.name} : ${this.roundParamsSeo[roundParams]['title']}`,
      `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du ${this.roundParamsSeo[roundParams]['desc']} en ${this.region.name} et découvrez les résultats des votes et suffrages en direct pour cette région ${this.region.code}.`
    );
    this.breadcrumbService.set('resultats-presidentielle-2022/:region', this.region.name);
    this.breadcrumbService.set('resultats-presidentielle-2022/:region/:round', `${this.roundParamsSeo[roundParams]['ariane']}`);
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
