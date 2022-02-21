import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonLdService } from 'ngx-seo';
import { URL_DOMAIN } from '../../../config/url.config';
import { SeoService } from '../../../core/services/seo.service';
import { FRANCE_DEPS_LIST } from '../sponsorship-department/departments.constant';

@Component({
  selector: 'app-sponsorship-home-department',
  templateUrl: './sponsorship-home-department.component.html',
  styleUrls: ['./sponsorship-home-department.component.scss']
})
export class SponsorshipHomeDepartmentComponent implements OnInit {

  results: any[];
  departments: any[];
  todayDate: any = Date.now();
  constructor(
    private readonly seoService: SeoService,
    private readonly jsonLdService: JsonLdService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.departments = FRANCE_DEPS_LIST;
    this.setSeo();
    this.setBreadCrumbJsonLd();
  }

  search($event): void {
    this.results = FRANCE_DEPS_LIST.filter((element) => element.name.toLowerCase().includes($event.query)).sort((a, b) => (a.name < b.name) ? -1 : 1);
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Carte des parrainages de la présidentielle 2022 par département et par ville - Les élections',
      'Retrouvez la carte des parrainages pour l\'élection présidentielle 2022 par département et par ville, avec la liste et le nombre parrainages, ainsi que les candidats soutenus'
    );
  }

  private setBreadCrumbJsonLd(): void {
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
    ]
    });
    this.jsonLdService.setData(breadCrumbObject);
  }
}
