import { SeoService } from './../../../core/services/seo.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sponsorship',
  templateUrl: './sponsorship.component.html',
  styleUrls: ['./sponsorship.component.scss']
})
export class SponsorshipComponent implements OnInit {

  isBrowser = isPlatformBrowser(this.platformId);
  constructor(private readonly seoService: SeoService, @Inject(PLATFORM_ID) private readonly platformId: any) { }

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
