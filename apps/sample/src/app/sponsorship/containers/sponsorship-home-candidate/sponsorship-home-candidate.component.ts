import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonLdService } from 'ngx-seo';
import { Observable } from 'rxjs';
import { URL_DOMAIN } from '../../../config/url.config';
import { SeoService } from '../../../core/services/seo.service';
import { SponsorshipService } from '../../services/sponsorship.service';

@Component({
  selector: 'app-sponsorship-home-candidate',
  templateUrl: './sponsorship-home-candidate.component.html',
  styleUrls: ['./sponsorship-home-candidate.component.scss']
})
export class SponsorshipHomeCandidateComponent implements OnInit {

  resultsCandidates: any[];
  ranking$: Observable<any>;
  todayDate: any = Date.now();
  constructor(
    public router: Router,
    private readonly seoService: SeoService,
    private readonly sponsorshipService: SponsorshipService,
    private readonly jsonLdService: JsonLdService
    ) { }

  ngOnInit(): void {
    this.setSeo();
    this.setBreadCrumbJsonLd();
    this.ranking$ = this.sponsorshipService.getRanking();
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

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Liste des parrainages de la présidentielle 2022 par candidat - Les élections',
      'Retrouvez la liste des parrainages de chaque candidat pour l\'élection présidentielle 2022, avec la liste des élus et le nombre parrainages obtenus pour chaque candidat, par ville et département.'
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
        "name": `Parrainages présidentielle 2022`,
        "item": `${URL_DOMAIN.main}/parrainages-presidentielle-2022`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Parrainages par candidat`,
        "item": `${URL_DOMAIN.main}/parrainages-presidentielle-2022/candidats`
      },
    ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

}
