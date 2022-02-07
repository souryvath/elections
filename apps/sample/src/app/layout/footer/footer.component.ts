import { Component, OnInit } from '@angular/core';
import { SOCIAL_NETWORK } from '../../config/social-network';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  networks = SOCIAL_NETWORK;
  constructor() { }

  ngOnInit(): void {
  }

}
