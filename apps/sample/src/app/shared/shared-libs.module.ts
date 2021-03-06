import { PronounPipe } from './pipes/pronoun.pipe';
import { SortArrayPipe } from './pipes/sort-array.pipe';
import { NumberFixPipe } from './pipes/number-fix.pipe';
import { IncludePipe } from './pipes/include.pipe';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingPipe } from './pipes/loading.pipe';
import { WordFirstUppercasePipe } from './pipes/word-first-uppercase.pipe';
import { WordSeoPipe } from './pipes/word-seo.pipe';
import { FindPipe } from './pipes/find.pipe';
import { ShareModule } from 'ngx-sharebuttons';
@NgModule({
  declarations: [
    WordFirstUppercasePipe,
    LoadingPipe,
    IncludePipe,
    NumberFixPipe,
    SortArrayPipe,
    WordSeoPipe,
    FindPipe,
    PronounPipe
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WordFirstUppercasePipe,
    DatePipe,
    WordSeoPipe,
    LoadingPipe,
    IncludePipe,
    NumberFixPipe,
    SortArrayPipe,
    FindPipe,
    PronounPipe,
    ShareModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class SharedLibsModule { }
