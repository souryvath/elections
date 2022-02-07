import { Component, Input, OnInit, EventEmitter, Output, ViewChild, HostListener } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-search-postal-code',
  templateUrl: './search-postal-code.component.html',
  styleUrls: ['./search-postal-code.component.scss']
})
export class SearchPostalCodeComponent implements OnInit {

  @Input() results;
  @Input() city;
  @Input() type;
  @Input() searchLabel;
  @Input() buttonLabel;
  @Input() selectedFuel;
  @Input() geolocalisation;
  @Output() readonly selectedPlaceEvent: EventEmitter<string> = new EventEmitter<string>(true);
  @Output() readonly searchEvent: EventEmitter<string> = new EventEmitter<string>(true);
  @Output() readonly geolocalisationEvent: EventEmitter<string> = new EventEmitter<string>(true);
  @ViewChild('autocomplete') autocomplete: AutoComplete;
  key: any;
  constructor() { }

  ngOnInit(): void {
  }

  selectPlace($event): void {
    if ($event) {
      this.city = $event;
    }
    setTimeout(function(){
      document.getElementById('autocomplete-input').blur();
    }, 100);
  }

  getKey($event) {
    if ($event.key === 'Enter') {
      this.selectedPlaceEvent.emit(this.city);
    }
  }

  search($event): void {
    this.searchEvent.emit($event);
  }

  findLocalisation($event): void {
    this.geolocalisationEvent.emit($event);
  }


}
