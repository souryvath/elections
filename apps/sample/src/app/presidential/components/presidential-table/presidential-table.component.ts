import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-table',
  templateUrl: './presidential-table.component.html',
  styleUrls: ['./presidential-table.component.scss']
})
export class PresidentialTableComponent implements OnInit {

  @Input() result;
  constructor() { }

  ngOnInit(): void {
  }

}
