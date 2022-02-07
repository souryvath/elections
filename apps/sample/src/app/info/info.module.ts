import { SharedModule } from './../shared/shared.module';
import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesComponent } from './cookies/cookies.component';
import { InfoRoutingModule } from './info-routing.module';
import { CguComponent } from './cgu/cgu.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';

@NgModule({
  declarations: [
    CookiesComponent,
    CguComponent,
    LegalNoticesComponent
  ],
  imports: [
    InfoRoutingModule,
    LayoutModule,
    SharedModule,
    CommonModule
  ]
})
export class InfoModule { }
