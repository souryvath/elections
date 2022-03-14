import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-presidential-table-map',
  templateUrl: './presidential-table-map.component.html',
  styleUrls: ['./presidential-table-map.component.scss']
})
export class PresidentialTableMapComponent {

  @Input() table;
  @Input() selectedTab;
  @Input() type;
  @Input() round;

  @Output() readonly selectTabEvent: EventEmitter<string> = new EventEmitter<string>(true);
  constructor() { }

  selectTab(type: string) {
    this.selectTabEvent.emit(type);
  }

}
