import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private readonly sponsorshipService: SponsorshipService) { }

  ngOnInit(): void {
    this.setSeo();
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
      'Liste des parrainages des présidentielles 2022 par candidat',
      'Retrouvez la liste des parrainages de chaque candidat pour les présidentielles 2022, avec la liste des élus et le nombre parrainages obtenus pour chaque candidat, par ville et département.'
    );
  }
}
