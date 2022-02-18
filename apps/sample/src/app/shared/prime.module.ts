import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  declarations: [],
  exports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
  ],
  imports: [
    TableModule,
    ButtonModule,
    AutoCompleteModule,
    ProgressSpinnerModule
  ]
})
export class PrimeModule { }
