import { SponsorshipService } from './../../services/sponsorship.service';
import { Observable } from 'rxjs';
import { SeoService } from './../../../core/services/seo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FRANCE_DEPS_LIST } from '../sponsorship-department/departments.constant';

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
    private readonly sponsorshipService: SponsorshipService
    ) { }

  ngOnInit(): void {
    this.setSeo();
    this.ranking$ = this.sponsorshipService.getRanking();
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Liste des parrainages des présidentielles 2022 par candidat et département',
      'Retrouvez la liste complète des parrainages pour les présidentielles 2022, pour chaque candidat, par nombre de parrainages obtenus, par élu, ville et département'
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

}
