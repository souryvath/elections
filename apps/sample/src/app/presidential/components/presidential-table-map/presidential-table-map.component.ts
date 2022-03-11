import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-table-map',
  templateUrl: './presidential-table-map.component.html',
  styleUrls: ['./presidential-table-map.component.scss']
})
export class PresidentialTableMapComponent implements OnInit {

  @Input() table;
  @Input() selectedTab;
  constructor() { }

  ngOnInit(): void {
    console.log(this.table);
  }

}
