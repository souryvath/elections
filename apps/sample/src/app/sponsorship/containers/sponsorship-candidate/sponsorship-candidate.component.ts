import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly sponsorshipService: SponsorshipService,
    private readonly seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.candidate$ = this.sponsorshipService.getCandidate('slug', params.slugCandidate).pipe(tap((element) => {
        this.setSeo(element.name);
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
      `Liste des parrainages des présidentielles 2022 pour le candidat ${candidateName}`,
      `Retrouvez la liste des parrainages du candidat ${candidateName} pour les présidentielles 2022, avec la liste des élus et le nombre parrainages obtenus, par ville et département.`,
      'IMAGE A MODIFIER'
    );
  }

}
