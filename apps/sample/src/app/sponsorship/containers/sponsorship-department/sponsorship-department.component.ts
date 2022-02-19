import { FRANCE_DEPS_LIST } from './departments.constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { SponsorshipService } from '../../services/sponsorship.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { URL_DOMAIN } from '../../../config/url.config';
import { JsonLdService } from 'ngx-seo';

@Component({
  selector: 'app-sponsorship-department',
  templateUrl: './sponsorship-department.component.html',
  styleUrls: ['./sponsorship-department.component.scss']
})
export class SponsorshipDepartmentComponent implements OnInit {

  results: any[];
  department$: Observable<any>;
  ranking: any;
  NBR_SPONSORSHIPS = 500;
  region: any[];
  places: any[]
  todayDate: any = Date.now();
  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly sponsorshipService: SponsorshipService,
    private readonly seoService: SeoService,
    private readonly jsonLdService: JsonLdService,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.department$ = this.sponsorshipService.getDepartment('slug', params.slugDepartment).pipe(tap((element) => {
        this.breadcrumbService.set('parrainages-presidentielle-2022/departements/:slugDepartment', element.name);
        const dep = FRANCE_DEPS_LIST.find((depItem) => depItem.name === element.name);
        this.region = FRANCE_DEPS_LIST.filter((item) => item.region.name === dep.region.name);
        this.places = element.sponsorships.filter((item) => item.mandate === 'Maire');
        this.setBreadCrumbJsonLd(dep.name, params.slugDepartment);
        this.setSeo(element.name);
      }));
    });
  }

  search($event): void {
    this.results = FRANCE_DEPS_LIST.filter((element) => element.name.toLowerCase().includes($event.query.toLowerCase()));
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

  private setSeo(departmentName: string): void {
    this.seoService.setSeoPage(
      `Carte des parrainages de la présidentielle 2022 dans le département ${departmentName} par ville - Les élections`,
      `Retrouvez la carte des parrainages pour l'élection présidentielle 2022 dans le département ${departmentName} et par ville, avec la liste et le nombre parrainages, ainsi que les candidats soutenus`
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
        "name": `Parrainages par département`,
        "item": `${URL_DOMAIN.main}/parrainages-presidentielle-2022/departements`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${name}`,
        "item": `${URL_DOMAIN.main}/parrainages-presidentielle-2022/departements/${slug}`
      }
    ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }

}
