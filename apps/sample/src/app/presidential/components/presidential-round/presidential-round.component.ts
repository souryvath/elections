import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-presidential-round',
  templateUrl: './presidential-round.component.html',
  styleUrls: ['./presidential-round.component.scss']
})
export class PresidentialRoundComponent implements OnInit {

  @Input() result;
  @Input() type;
  @Input() round;
  @Input() resultBefore;
  @Input() table;
  @Input() selectedTab;
  @Input() resultRegion;
  @Input() resultDepartement;
  labelDisplayMore = 'voir plus';
  icon = 'keyboard_arrow_down'
  isHidden = true;
  isBrowser = isPlatformBrowser(this.platformId);
  @Output() readonly selectTabEvent: EventEmitter<any> = new EventEmitter<any>(true);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
  }

  ngOnInit(): void {
  }

  displayMore(): void {
    if (this.isHidden === true) {
      this.labelDisplayMore = 'voir moins';
      this.icon = 'keyboard_arrow_up';
    } else {
      this.labelDisplayMore = 'voir plus';
      this.icon = 'keyboard_arrow_down';
    }
    this.isHidden = !this.isHidden;
  }

  selectTab(type: string) {
    const object = {
      type,
      round: this.round
    };
    this.selectTabEvent.emit(object);
  }

}
