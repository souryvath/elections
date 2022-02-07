import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayAdsComponent } from './display-ads/display-ads.component';
import { AdsenseModule } from 'ng2-adsense';
import { ArticleAdsComponent } from './article-ads/article-ads.component';
import { FeedAdsComponent } from './feed-ads/feed-ads.component';
import { ADS } from '../config/ads.config';

@NgModule({
  declarations: [
    DisplayAdsComponent,
    ArticleAdsComponent,
    FeedAdsComponent
  ],
  imports: [
    CommonModule,
    AdsenseModule.forRoot({
      adClient: ADS.adClient
    }),
  ],
  exports: [
    DisplayAdsComponent,
    ArticleAdsComponent,
    FeedAdsComponent
  ]
})
export class AdsModule { }
