import { CANDIDATES_PRESIDENTIAL_FRONT } from './../../../shared/constants/candidates.constants';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonLdService } from 'ngx-seo';
import { BreadcrumbService } from 'xng-breadcrumb';
import { SeoService } from '../../../core/services/seo.service';
import { PresidentialService } from '../../services/presidential.service';
import { FRANCE_REGIONS } from '../../../shared/constants/regions.constant';
import { URL_DOMAIN } from '../../../config/url.config';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-presidential-candidate-sheet',
  templateUrl: './presidential-candidate-sheet.component.html',
  styleUrls: ['./presidential-candidate-sheet.component.scss']
})
export class PresidentialCandidateSheetComponent implements OnInit {

  result$: Observable<any>;
  type = 'candidate';
  resultRound = [];
  departement$: Observable<any>;
  resultRegion: any;
  resultDepartement: any;
  listRegions: any[] = FRANCE_REGIONS;
  listCity$: Observable<any>;
  listCandidates = CANDIDATES_PRESIDENTIAL_FRONT;
  tableRound1: any[];
  tableRound2: any[];
  selectedTab: any = {
    '1': 'Département',
    '2': 'Département'
  };

  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly presidentialService: PresidentialService,
    private readonly jsonLdService: JsonLdService,
    private readonly seoService: SeoService
  ) { }

  ngOnInit(): void {
    const candidateParams = this.route.snapshot.params['slugCandidate'];
    this.listCity$ = this.presidentialService.getMostVotedCities();
    const candidate = CANDIDATES_PRESIDENTIAL_FRONT.find((candItem) => candItem.slug === candidateParams);

    this.result$ = this.presidentialService.getCandidate(candidateParams, 'national').pipe(tap((element) => {
      this.resultRound = element;
      this.initPage(candidate, candidateParams);
      this.resultRound.forEach((item) => {
        const candidatesRanking = item.candidates.sort((a, b) => (Number(a.pctVotesOnExprimated) > Number(b.pctVotesOnExprimated)) ? -1 : 1);
        const rank = candidatesRanking.findIndex((item) => item.slug === candidateParams);
        item.candidates = item.candidates.filter((itemCandidate) => itemCandidate.slug === candidateParams);
        item.ranking = rank + 1;
        item.name = candidate.name;
      });
      this.handleTabRegion(candidateParams);
      this.handleTabDepartement(candidateParams);

    }));
  }

  selectTab($event): void {
    if ($event.round === '1') {
      if ($event.type === 'Département') {
        this.tableRound1 = this.resultDepartement.find(((item) => item.round === '1')).places;
      } else if ($event.type === 'Région') {
        this.tableRound1 = this.resultRegion.find(((item) => item.round === '1')).places;
      }

    }
    else if ($event.round === '2') {
      if ($event.type === 'Département') {
        this.tableRound2 = this.resultDepartement.find(((item) => item.round === '2')).places;
      } else if ($event.type === 'Région') {
        this.tableRound2 = this.resultRegion.find(((item) => item.round === '2')).places;
      }
    }
    this.selectedTab[$event.round] = $event.type;
  }

  private initPage(candidate: any, candidateParams: string): void {
    this.seoService.setSeoPage(
      `Résultats de ${candidate.name} pour l'élection présidentielle 2022 en France par région et par département lors du 1er et 2ème tour`,
      `Consultez dès maintenant les résultats de l'élection présidentielle 2022 du candidat ${candidate.name} en France et découvrez les résultats des votes de ses électeurs par région et par département.`
    );
    this.breadcrumbService.set('resultats-presidentielle-2022/candidats/:slugCandidate', candidate.name);
    this.setBreadCrumbJsonLd(candidate.name, candidateParams);
  }

  private handleTabRegion(candidateParams: string): void {
    this.presidentialService.getCandidate(candidateParams, 'region').subscribe((result) => {
      const regionRound1 = result.filter((item) => item.round === '1').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
      const regionRound2 = result.filter((item) => item.round === '2').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
      this.resultRegion = [];
      if (regionRound1.length > 0) {
        this.resultRegion.push({
          round: '1',
          places: regionRound1
        });
      }
      if (regionRound2.length > 0) {
        this.resultRegion.push({
          round: '2',
          places: regionRound2
        });
      }
    })
  }

  private handleTabDepartement(candidateParams: string): void {
    this.presidentialService.getCandidate(candidateParams, 'departement').subscribe((result) => {
      const departementRound1 = result.filter((item) => item.round === '1').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
      const departementRound2 = result.filter((item) => item.round === '2').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
      this.resultDepartement = [];
      if (departementRound1.length > 0) {
        this.resultDepartement.push({
          round: '1',
          places: departementRound1
        });
      }
      if (departementRound2.length > 0) {
        this.resultDepartement.push({
          round: '2',
          places: departementRound2
        });
      }
      this.tableRound1 = this.resultDepartement.find(((item) => item.round === '1')).places;
      this.tableRound2 = this.resultDepartement.find(((item) => item.round === '2')).places;
    })
  }

  private setBreadCrumbJsonLd(name: string, slug: string): void {
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
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${name}`,
        "item": `${URL_DOMAIN.main}/resultats-presidentielle-2022/candidats/${slug}`
      }
    ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

}
