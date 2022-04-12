import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-result',
  templateUrl: './presidential-result.component.html',
  styleUrls: ['./presidential-result.component.scss']
})
export class PresidentialResultComponent implements OnInit {

  @Input() result;
  @Input() roundParams;
  @Input() type;
  numberResults = 3;
  labelDisplayMore = 'afficher tous les résultats';
  icon = 'fa-chevron-down'

  constructor() { }

  ngOnInit(): void {
    if (this.roundParams || this.type === 'France' || this.type === 'Home') {
      this.numberResults = 5;
    }
  }

  displayMore(): void {
    if (this.numberResults === 5) {
      this.numberResults = this.result.length;
      this.labelDisplayMore = 'afficher moins de résultats';
      this.icon = 'fa-chevron-up';
    } else {
      this.numberResults = 5;
      this.labelDisplayMore = 'afficher tous les résultats';
      this.icon = 'fa-chevron-down';
    }
  }

}
