import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-list-link',
  templateUrl: './presidential-list-link.component.html',
  styleUrls: ['./presidential-list-link.component.scss']
})
export class PresidentialListLinkComponent implements OnInit {

  @Input() title;
  @Input() list;
  @Input() type;
  @Input() place;

  constructor() { }

  ngOnInit(): void {
    console.log(this.place);
    this.list.sort((a, b) => (a.slug > b.slug) ? 1 : -1);
  }

}
