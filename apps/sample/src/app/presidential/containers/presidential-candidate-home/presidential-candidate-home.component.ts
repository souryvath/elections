import { SeoService } from './../../../core/services/seo.service';
import { Observable } from 'rxjs';
import { FRANCE_REGIONS } from './../../../shared/constants/regions.constant';
import { FRANCE_DEPS_LIST } from './../../../shared/constants/departments.constant';
import { Component, OnInit } from '@angular/core';
import { CANDIDATES_PRESIDENTIAL_FRONT } from '../../../shared/constants/candidates.constants';
import { PresidentialService } from '../../services/presidential.service';
import { JsonLdService } from 'ngx-seo';
import { URL_DOMAIN } from '../../../config/url.config';

@Component({
  selector: 'app-presidential-candidate-home',
  templateUrl: './presidential-candidate-home.component.html',
  styleUrls: ['./presidential-candidate-home.component.scss']
})
export class PresidentialCandidateHomeComponent implements OnInit {

  candidates = CANDIDATES_PRESIDENTIAL_FRONT;
  listDepartements: any[] = FRANCE_DEPS_LIST.filter((item) => item.code !== 'FR-EU');
  listRegions: any[] = FRANCE_REGIONS;
  listCity$: Observable<any>;

  constructor(
    private readonly presidentialService: PresidentialService,
    private readonly jsonLdService: JsonLdService,
    private readonly seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setSeoPage(
      `Résultats des candidats pour l'élection présidentielle 2022 en France par région et par département lors du 1er et 2ème tour`,
      `Consultez dès maintenant les résultats de l'élection présidentielle 2022 de tous les candidats en France et découvrez les résultats des votes des électeurs par région et par département.`
    );
    this.setBreadCrumbJsonLd();
    this.listCity$ = this.presidentialService.getMostVotedCities();
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Candidats`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/candidats`
      }

    ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }


}
