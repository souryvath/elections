import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presidential-round',
  templateUrl: './presidential-round.component.html',
  styleUrls: ['./presidential-round.component.scss']
})
export class PresidentialRoundComponent {

  @Input() result;
  @Input() type;
  @Input() round;
  labelDisplayMore = 'voir plus';
  icon = 'keyboard_arrow_down'

  isHidden = true;

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
