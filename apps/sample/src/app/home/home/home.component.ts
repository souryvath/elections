import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonLdService } from 'ngx-seo';
import { Observable } from 'rxjs';
import { URL_DOMAIN } from '../../config/url.config';
import { SeoService } from '../../core/services/seo.service';
import { FRANCE_DEPS_LIST } from '../../shared/constants/departments.constant';
import { SponsorshipService } from '../../sponsorship/services/sponsorship.service';
import { PresidentialService } from '../../presidential/services/presidential.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ranking$: Observable<any>;
  resultsCandidates: any[];
  resultsDepartments: any[];
  todayDate: any = Date.now();
  result$: Observable<any>;
  type = 'France';
  table$: Observable<any>;
  selectedTab: any;
  constructor(
    public router: Router,
    private readonly seoService: SeoService,
    private readonly sponsorshipService: SponsorshipService,
    private readonly jsonLdService: JsonLdService,
    private readonly presidentialService: PresidentialService
  ) {
  }

  ngOnInit(): void {
    this.setSeo();
    this.setBreadCrumbJsonLd();
    this.ranking$ = this.sponsorshipService.getRanking();
    this.result$ = this.presidentialService.getFranceResult();
    this.table$ = this.presidentialService.getDepartements('2');
    this.selectedTab = {
      '2': 'Département'
    }
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Résultats des élections de la présidentielle 2022 et parrainages - Les élections',
      'Résultats prochains de l\'élection présidentielle 2022 par ville et listes complètes des parrainages pour les présidentielles 2022, pour chaque candidat, par nombre de parrainages obtenus, par élu, ville et département'
    );
  }

  searchCandidate($event): void {
    this.sponsorshipService.getCandidates($event.query).subscribe(data => {
      this.resultsCandidates = data;
    });
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

  searchDepartment($event): void {
    this.resultsDepartments = FRANCE_DEPS_LIST.filter((element) => element.name.toLowerCase().includes($event.query));
  }

  setBreadCrumbJsonLd(): void {
    const breadCrumbObject = this.jsonLdService.getObject('BreadcrumbList', {
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": `${URL_DOMAIN.main}`
      }]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

  selectTab($event): void {
    if ($event.type === 'Département') {
      this.table$ = this.presidentialService.getDepartements('2');
    } else if ($event.type === 'Région') {
      this.table$ = this.presidentialService.getRegions('2');
    }
    this.selectedTab[$event.round] = $event.type;
  }

}
