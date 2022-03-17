import { LayoutModule } from './../layout/layout.module';
import { SponsorshipModule } from './../sponsorship/sponsorship.module';
import { PresidentialModule } from './../presidential/presidential.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    PresidentialModule,
    SponsorshipModule,
    LayoutModule
  ]
})
export class HomeModule { }
