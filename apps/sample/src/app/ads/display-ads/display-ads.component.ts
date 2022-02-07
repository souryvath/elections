import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { ADS } from '../../config/ads.config';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-display-ads',
  templateUrl: './display-ads.component.html',
  styleUrls: ['./display-ads.component.scss']
})
export class DisplayAdsComponent implements OnInit {

  @Input() slot;
  color = 'transparent';
  height = 'auto';
  ads = ADS;
  isBrowser = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) { }

  ngOnInit(): void {
    if (environment.production === false) {
      this.color = 'grey';
      this.height = '300px';
    }
  }

}
