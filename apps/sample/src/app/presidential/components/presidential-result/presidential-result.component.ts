import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-result',
  templateUrl: './presidential-result.component.html',
  styleUrls: ['./presidential-result.component.scss']
})
export class PresidentialResultComponent implements OnInit {

  @Input() result;
  @Input() stat;
  numberResults = 5;

  constructor() { }

  ngOnInit(): void {
  }

  displayMore(): void {
    if (this.numberResults === 5) {
      this.numberResults = this.result.length;
    } else {
      this.numberResults = 5;
    }

  }

}
