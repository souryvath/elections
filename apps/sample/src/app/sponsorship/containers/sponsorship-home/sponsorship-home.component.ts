import { SeoService } from './../../../core/services/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsorship-home',
  templateUrl: './sponsorship-home.component.html',
  styleUrls: ['./sponsorship-home.component.scss']
})
export class SponsorshipHomeComponent implements OnInit {

  constructor(private readonly seoService: SeoService) { }

  ngOnInit(): void {
    this.setSeo();
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Liste des parrainages des présidentielles 2022 par candidat et département',
      'Retrouvez la liste complète des parrainages pour les présidentielles 2022, pour chaque candidat, par nombre de parrainages obtenus, par élu, ville et département',
      'IMAGE A MODIFIER'
    );
  }

}
