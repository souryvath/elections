import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [],
  exports: [
    CardModule,
    PanelModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule
  ],
  imports: [
    CardModule,
    PanelModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule
  ]
})
export class PrimeModule { }
