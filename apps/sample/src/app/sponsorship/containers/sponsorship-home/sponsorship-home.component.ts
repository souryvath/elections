import { JsonLdService } from 'ngx-seo';
import { SponsorshipService } from './../../services/sponsorship.service';
import { Observable } from 'rxjs';
import { SeoService } from './../../../core/services/seo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FRANCE_DEPS_LIST } from '../sponsorship-department/departments.constant';
import { URL_DOMAIN } from '../../../config/url.config';

@Component({
  selector: 'app-sponsorship-home',
  templateUrl: './sponsorship-home.component.html',
  styleUrls: ['./sponsorship-home.component.scss']
})
export class SponsorshipHomeComponent implements OnInit {

  ranking$: Observable<any>;
  resultsCandidates: any[];
  resultsDepartments: any[];
  todayDate: any = Date.now();
  constructor(
    public router: Router,
    private readonly seoService: SeoService,
    private readonly sponsorshipService: SponsorshipService,
    private readonly jsonLdService: JsonLdService,
    ) { }

  ngOnInit(): void {
    this.setSeo();
    this.setBreadCrumbJsonLd();
    this.ranking$ = this.sponsorshipService.getRanking();
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Liste des parrainages de la présidentielle 2022 par candidat et département - Les élections',
      'Retrouvez la liste complète des parrainages pour l\'élection présidentielle 2022, pour chaque candidat, par nombre de parrainages obtenus, par élu, ville et département'
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
    this.resultsDepartments = FRANCE_DEPS_LIST.filter((element) => element.name.toLowerCase().includes($event.query)).sort((a, b) => (a.name < b.name) ? -1 : 1);;
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
        "name": `Parrainages présidentielle 2022`,
        "item": `${URL_DOMAIN.main}/parrainages-presidentielle-2022`
      }]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

}
