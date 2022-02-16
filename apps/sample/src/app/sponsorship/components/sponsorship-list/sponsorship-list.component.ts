import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.scss']
})
export class SponsorshipListComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
