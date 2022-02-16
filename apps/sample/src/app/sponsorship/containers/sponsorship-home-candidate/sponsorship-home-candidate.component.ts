import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-sponsorship-home-candidate',
  templateUrl: './sponsorship-home-candidate.component.html',
  styleUrls: ['./sponsorship-home-candidate.component.scss']
})
export class SponsorshipHomeCandidateComponent implements OnInit {

  constructor(private readonly seoService: SeoService) { }

  ngOnInit(): void {
    this.setSeo();
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Liste des parrainages des présidentielles 2022 par candidat',
      'Retrouvez la liste des parrainages de chaque candidat pour les présidentielles 2022, avec la liste des élus et le nombre parrainages obtenus pour chaque candidat, par ville et département.',
      'IMAGE A MODIFIER'
    );
  }
}
