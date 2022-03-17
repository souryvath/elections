import { SharedModule } from './../shared/shared.module';
import { PresidentialRoutingModule } from './presidential-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresidentialComponent } from './containers/presidential/presidential.component';
import { PresidentialSheetComponent } from './containers/presidential-sheet/presidential-sheet.component';
import { PresidentialTableComponent } from './components/presidential-table/presidential-table.component';
import { PresidentialListLinkComponent } from './components/presidential-list-link/presidential-list-link.component';
import { PresidentialSearchComponent } from './components/presidential-search/presidential-search.component';
import { PresidentialProgressResultComponent } from './components/presidential-progress-result/presidential-progress-result.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AdsModule } from '../ads/ads.module';
import { LayoutModule } from '../layout/layout.module';
import { PresidentialHomeComponent } from './containers/presidential-home/presidential-home.component';
import { PresidentialResultComponent } from './components/presidential-result/presidential-result.component';
import { PresidentialRoundComponent } from './components/presidential-round/presidential-round.component';
import { PresidentialCandidateHomeComponent } from './containers/presidential-candidate-home/presidential-candidate-home.component';
import { PresidentialCandidateSheetComponent } from './containers/presidential-candidate-sheet/presidential-candidate-sheet.component';
import { PresidentialTableMapComponent } from './components/presidential-table-map/presidential-table-map.component';

@NgModule({
  declarations: [
    PresidentialComponent,
    PresidentialSheetComponent,
    PresidentialTableComponent,
    PresidentialListLinkComponent,
    PresidentialSearchComponent,
    PresidentialProgressResultComponent,
    PresidentialHomeComponent,
    PresidentialResultComponent,
    PresidentialRoundComponent,
    PresidentialCandidateHomeComponent,
    PresidentialCandidateSheetComponent,
    PresidentialTableMapComponent
  ],
  exports: [
    PresidentialRoundComponent,
    PresidentialSearchComponent
  ],
  imports: [
    CommonModule,
    PresidentialRoutingModule,
    SharedModule,
    AdsModule,
    ShareButtonsModule,
    ShareIconsModule,
    LayoutModule
  ]
})
export class PresidentialModule { }
