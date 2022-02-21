import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsorship-ranking',
  templateUrl: './sponsorship-ranking.component.html',
  styleUrls: ['./sponsorship-ranking.component.scss']
})
export class SponsorshipRankingComponent {

  @Input() data;
  @Input() candidate;
  @Input() isHomepage;
  @Input() isDep;
}
