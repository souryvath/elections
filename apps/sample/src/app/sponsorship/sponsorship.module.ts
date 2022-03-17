import { LayoutModule } from './../layout/layout.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorshipRoutingModule } from './sponsorship-routing.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AdsModule } from '../ads/ads.module';
import { SponsorshipCandidateComponent } from './containers/sponsorship-candidate/sponsorship-candidate.component';
import { SponsorshipMapComponent } from './components/sponsorship-map/sponsorship-map.component';
import { SponsorshipGraphComponent } from './components/sponsorship-graph/sponsorship-graph.component';
import { SponsorshipRankingComponent } from './components/sponsorship-ranking/sponsorship-ranking.component';
import { SponsorshipListComponent } from './components/sponsorship-list/sponsorship-list.component';
import { SponsorshipComponent } from './containers/sponsorship/sponsorship.component';
import { SponsorshipHomeComponent } from './containers/sponsorship-home/sponsorship-home.component';
import { SponsorshipHomeCandidateComponent } from './containers/sponsorship-home-candidate/sponsorship-home-candidate.component';
import { SponsorshipHomeDepartmentComponent } from './containers/sponsorship-home-department/sponsorship-home-department.component';
import { SponsorshipDepartmentComponent } from './containers/sponsorship-department/sponsorship-department.component';

@NgModule({
  declarations: [
    SponsorshipCandidateComponent,
    SponsorshipMapComponent,
    SponsorshipGraphComponent,
    SponsorshipRankingComponent,
    SponsorshipListComponent,
    SponsorshipComponent,
    SponsorshipHomeComponent,
    SponsorshipHomeCandidateComponent,
    SponsorshipHomeDepartmentComponent,
    SponsorshipDepartmentComponent,
  ],
  exports: [
    SponsorshipRankingComponent
  ],
  imports: [
    CommonModule,
    SponsorshipRoutingModule,
    SharedModule,
    AdsModule,
    ShareButtonsModule,
    ShareIconsModule,
    LayoutModule
  ]
})
export class SponsorshipModule { }
