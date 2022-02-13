import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SponsorshipService } from '../../services/sponsorship.service';

@Component({
  selector: 'app-sponsorship-candidate',
  templateUrl: './sponsorship-candidate.component.html',
  styleUrls: ['./sponsorship-candidate.component.scss']
})
export class SponsorshipCandidateComponent implements OnInit {

  results: any[];
  sponsorships$: Observable<any>;
  ranking$: Observable<any>;
  NBR_SPONSORSHIPS = 500;
  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly sponsorshipService: SponsorshipService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sponsorships$ = this.sponsorshipService.getSponsorships('slugCandidate', params.slugCandidate)
      this.ranking$ = this.sponsorshipService.getRanking(params.slugCandidate).pipe(tap((element) => {
        console.log(element);
      }));
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

}
