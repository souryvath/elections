import { Component, OnInit } from '@angular/core';
import { JsonLdService } from 'ngx-seo';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AVAILABLE_ROUND } from '../../../config/round.config';
import { URL_DOMAIN } from '../../../config/url.config';
import { SeoService } from '../../../core/services/seo.service';
import { FRANCE_DEPS_LIST } from '../../../shared/constants/departments.constant';
import { FRANCE_REGIONS } from '../../../shared/constants/regions.constant';
import { PresidentialService } from '../../services/presidential.service';

@Component({
  selector: 'app-presidential-home',
  templateUrl: './presidential-home.component.html',
  styleUrls: ['./presidential-home.component.scss']
})
export class PresidentialHomeComponent implements OnInit {

  result$: Observable<any>;
  type = 'France';
  listDepartements: any[] = FRANCE_DEPS_LIST.filter((item) => item.code !== 'FR-EU');
  listRegions: any[] = FRANCE_REGIONS;
  listCity$: Observable<any>;
  table$: Observable<any>;
  selectedTab: any;
  AVAILABLE_ROUND = AVAILABLE_ROUND;
  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly presidentialService: PresidentialService,
    private readonly jsonLdService: JsonLdService,
    private readonly seoService: SeoService,
  ) { }

  ngOnInit(): void {
    this.result$ = this.presidentialService.getFranceResult();
    this.listCity$ = this.presidentialService.getMostVotedCities();
    this.table$ = this.presidentialService.getDepartements(AVAILABLE_ROUND);
    this.setSeo();
    this.setBreadCrumbJsonLd();
    this.selectedTab = {
      '2': 'Département'
    }
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      `Résultats de l'élection présidentielle 2022 en France : 1er et 2ème tour`,
      `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du 1er et 2nd tour en France et découvrez les résultats des votes et suffrages en direct des français et françaises.`
    );
  }

  setBreadCrumbJsonLd(): void {
    const breadCrumbObject = this.jsonLdService.getObject('BreadcrumbList', {
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": `${URL_DOMAIN.main}`
      },{
        "@type": "ListItem",
        "position": 2,
        "name": `Election présidentielle 2022`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022`
      }]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

  selectTab($event): void {
    if ($event.type === 'Département') {
      this.table$ = this.presidentialService.getDepartements(AVAILABLE_ROUND);
    } else if ($event.type === 'Région') {
      this.table$ = this.presidentialService.getRegions(AVAILABLE_ROUND);
    }
    this.selectedTab[$event.round] = $event.type;
  }

}
