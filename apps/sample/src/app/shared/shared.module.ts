import { SharedLibsModule } from './shared-libs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from './prime.module';
import { MapComponent } from './components/map/map.component';
import { SearchPostalCodeComponent } from './components/search-postal-code/search-postal-code.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MapComponent,
    SearchPostalCodeComponent
  ],
  exports: [
    CommonModule,
    SharedLibsModule,
    PrimeModule,
    MapComponent,
    SearchPostalCodeComponent,
    BreadcrumbModule,
    FontAwesomeModule
  ],
  imports: [
    CommonModule,
    SharedLibsModule,
    PrimeModule,
    BreadcrumbModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
