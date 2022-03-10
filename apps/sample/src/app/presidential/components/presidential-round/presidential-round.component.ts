import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-presidential-round',
  templateUrl: './presidential-round.component.html',
  styleUrls: ['./presidential-round.component.scss']
})
export class PresidentialRoundComponent {

  @Input() result;
  @Input() type;
  @Input() round;
  @Input() resultBefore;
  labelDisplayMore = 'voir plus';
  icon = 'keyboard_arrow_down'
  isHidden = true;
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {

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



}
