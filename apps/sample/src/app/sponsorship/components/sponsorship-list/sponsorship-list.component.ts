import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.scss']
})
export class SponsorshipListComponent implements OnInit {

  @Input() data;
  @Input() type;
  constructor() { }

  ngOnInit(): void {
  }

}
