import { ListButtonsComponent } from './components/list-buttons/list-buttons.component';
import { SharedLibsModule } from './shared-libs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from './prime.module';
import { MapComponent } from './components/map/map.component';
import { SearchPostalCodeComponent } from './components/search-postal-code/search-postal-code.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { ShareButtonsComponent } from './components/share-buttons/share-buttons.component';

@NgModule({
  declarations: [
    MapComponent,
    SearchPostalCodeComponent,
    ListButtonsComponent,
    ShareButtonsComponent
  ],
  exports: [
    CommonModule,
    SharedLibsModule,
    PrimeModule,
    MapComponent,
    SearchPostalCodeComponent,
    ListButtonsComponent,
    BreadcrumbModule,
    ShareButtonsComponent
  ],
  imports: [
    CommonModule,
    SharedLibsModule,
    PrimeModule,
    BreadcrumbModule
  ]
})
export class SharedModule { }
