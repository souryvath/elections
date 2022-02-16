import { FRANCE_DEPS_LIST } from './departments.constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { SponsorshipService } from '../../services/sponsorship.service';

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
  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly sponsorshipService: SponsorshipService,
    private readonly seoService: SeoService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.department$ = this.sponsorshipService.getDepartment('slug', params.slugDepartment).pipe(tap((element) => {
        const dep = FRANCE_DEPS_LIST.find((depItem) => depItem.name === element.name);
        console.log(dep.region.name);
        console.log(FRANCE_DEPS_LIST);
        this.region = FRANCE_DEPS_LIST.filter((item) => item.region.name === dep.region.name);
        this.setSeo(element.name);
      }));
    });
  }

  search($event): void {
    // console.log($event.query);
    this.results = FRANCE_DEPS_LIST.filter((element) => element.name.toLowerCase().includes($event.query));
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

  private setSeo(candidateName: string): void {
    this.seoService.setSeoPage(
      `Liste des parrainages des présidentielles 2022 pour le candidat ${candidateName}`,
      `Retrouvez la liste des parrainages du candidat ${candidateName} pour les présidentielles 2022, avec la liste des élus et le nombre parrainages obtenus, par ville et département.`,
      'IMAGE A MODIFIER'
    );
  }

}
