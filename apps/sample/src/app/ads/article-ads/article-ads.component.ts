import { environment } from './../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { ADS } from '../../config/ads.config';

@Component({
  selector: 'app-article-ads',
  templateUrl: './article-ads.component.html',
  styleUrls: ['./article-ads.component.scss']
})
export class ArticleAdsComponent implements OnInit {

  @Input() slot;
  color = 'transparent';
  height = 'auto';
  ads = ADS;
  constructor() { }

  ngOnInit(): void {
    if (environment.production === false) {
      this.color = 'green';
      this.height = '300px';
    }
  }

}
