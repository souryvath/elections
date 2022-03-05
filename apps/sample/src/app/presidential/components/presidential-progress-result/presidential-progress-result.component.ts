import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-progress-result',
  templateUrl: './presidential-progress-result.component.html',
  styleUrls: ['./presidential-progress-result.component.scss']
})
export class PresidentialProgressResultComponent implements OnInit {

  @Input() item;
  constructor() { }

  ngOnInit(): void {
  }

}
