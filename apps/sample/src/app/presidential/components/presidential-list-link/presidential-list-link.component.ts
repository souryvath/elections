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
  NUMBER_RESULT = 25;
  numberResults = this.NUMBER_RESULT;
  labelDisplayMore = 'voir plus';
  icon = 'keyboard_arrow_down'

  constructor() { }

  ngOnInit(): void {
    this.list.sort((a, b) => (a.slug > b.slug) ? 1 : -1);
  }

  displayMore(): void {
    if (this.numberResults === this.NUMBER_RESULT) {
      this.numberResults = this.list.length;
      this.labelDisplayMore = 'voir moins';
      this.icon = 'keyboard_arrow_up';
    } else {
      this.numberResults = this.NUMBER_RESULT;
      this.labelDisplayMore = 'voir plus';
      this.icon = 'keyboard_arrow_down';
    }
  }

}
