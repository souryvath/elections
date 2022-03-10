import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-result',
  templateUrl: './presidential-result.component.html',
  styleUrls: ['./presidential-result.component.scss']
})
export class PresidentialResultComponent implements OnInit {

  @Input() result;
  numberResults = 5;
  labelDisplayMore = 'afficher tous les résultats';
  icon = 'keyboard_arrow_down'

  constructor() { }

  ngOnInit(): void {
  }

  displayMore(): void {
    if (this.numberResults === 5) {
      this.numberResults = this.result.length;
      this.labelDisplayMore = 'afficher moins de résultats';
      this.icon = 'keyboard_arrow_up';
    } else {
      this.numberResults = 5;
      this.labelDisplayMore = 'afficher tous les résultats';
      this.icon = 'keyboard_arrow_down';
    }
  }

}
