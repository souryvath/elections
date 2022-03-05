import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presidential-round',
  templateUrl: './presidential-round.component.html',
  styleUrls: ['./presidential-round.component.scss']
})
export class PresidentialRoundComponent {

  @Input() stat;
  @Input() result;
  @Input() place;
  @Input() type;
  @Input() round;

  isHidden = true;

  displayMore() {
    this.isHidden = !this.isHidden;
  }


}
