import { FRANCE_DEPS_LIST } from './departments.constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { SponsorshipService } from '../../services/sponsorship.service';
import { BreadcrumbService } from 'xng-breadcrumb';

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
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.department$ = this.sponsorshipService.getDepartment('slug', params.slugDepartment).pipe(tap((element) => {
        this.breadcrumbService.set('parrainages-presidentielle-2022/departements/:slugDepartment', element.name);
        const dep = FRANCE_DEPS_LIST.find((depItem) => depItem.name === element.name);
        this.region = FRANCE_DEPS_LIST.filter((item) => item.region.name === dep.region.name);
        this.places = element.sponsorships.filter((item) => item.mandate === 'Maire');
        this.setSeo(element.name);
      }));
    });
  }

  search($event): void {
    this.results = FRANCE_DEPS_LIST.filter((element) => element.name.toLowerCase().includes($event.query));
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

  private setSeo(departmentName: string): void {
    this.seoService.setSeoPage(
      `Carte des parrainages présidentielles 2022 dans le département ${departmentName} par ville`,
      `Retrouvez la carte des parrainages pour les présidentielles 2022 dans le département ${departmentName} et par ville, avec la liste et le nombre parrainages, ainsi que les candidats soutenus`
    );
  }

}
