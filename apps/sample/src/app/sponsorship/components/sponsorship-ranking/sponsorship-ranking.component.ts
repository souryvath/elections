import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsorship-ranking',
  templateUrl: './sponsorship-ranking.component.html',
  styleUrls: ['./sponsorship-ranking.component.scss']
})
export class SponsorshipRankingComponent implements OnInit {

  @Input() data;
  @Input() candidate;
  constructor() { }

  ngOnInit(): void {
  }

}
