import { environment } from './../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { ADS } from '../../config/ads.config';

@Component({
  selector: 'app-feed-ads',
  templateUrl: './feed-ads.component.html',
  styleUrls: ['./feed-ads.component.scss']
})
export class FeedAdsComponent implements OnInit {

  @Input() slot;
  @Input() key;
  color = 'transparent';
  height = 'auto';
  ads = ADS;
  constructor() { }

  ngOnInit(): void {
    if (environment.production === false) {
      this.color = 'blue';
      this.height = '300px';
    }
  }

}
