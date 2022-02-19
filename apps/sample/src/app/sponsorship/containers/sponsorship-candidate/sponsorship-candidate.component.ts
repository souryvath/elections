import { JsonLdService } from 'ngx-seo';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { URL_DOMAIN } from '../../../config/url.config';
import { SeoService } from '../../../core/services/seo.service';
import { SponsorshipService } from '../../services/sponsorship.service';

@Component({
  selector: 'app-sponsorship-candidate',
  templateUrl: './sponsorship-candidate.component.html',
  styleUrls: ['./sponsorship-candidate.component.scss']
})
export class SponsorshipCandidateComponent implements OnInit {

  results: any[];
  candidate$: Observable<any>;
  ranking: any;
  NBR_SPONSORSHIPS = 500;
  todayDate: any = Date.now();
  isBrowser = isPlatformBrowser(this.platformId);
  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly sponsorshipService: SponsorshipService,
    private readonly seoService: SeoService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly jsonLdService: JsonLdService,
    @Inject(PLATFORM_ID) private readonly platformId: any
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.candidate$ = this.sponsorshipService.getCandidate('slug', params.slugCandidate).pipe(tap((element) => {
        this.setSeo(element.name);
        this.breadcrumbService.set('parrainages-presidentielle-2022/candidats/:slugCandidate', element.name);
        this.setBreadCrumbJsonLd(element.name, params.slugCandidate);
      }));
      // this.department$ = this.sponsorshipService.getSponsorshipsBydepartment(params.slugCandidate);
      this.sponsorshipService.getRanking().subscribe((result) => {
        this.ranking = result;
      });
    });
  }

  search($event): void {
    this.sponsorshipService.getCandidates($event.query).subscribe(data => {
      this.results = data;
    });
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

  private setSeo(candidateName: string): void {
    this.seoService.setSeoPage(
      `Liste des parrainages de la présidentielle 2022 pour le candidat ${candidateName} - Les élections`,
      `Retrouvez la liste des parrainages du candidat ${candidateName} pour l'élection présidentielle 2022, avec la liste des élus et le nombre parrainages obtenus, par ville et département.`
    );
  }

  private setBreadCrumbJsonLd(name, slug): void {
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
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${name}`,
        "item": `${URL_DOMAIN.main}/parrainages-presidentielle-2022/candidats/${slug}`
      }
    ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

}
