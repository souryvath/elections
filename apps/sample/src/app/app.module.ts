import localeFr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AdsModule } from './ads/ads.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { JsonLdModule } from 'ngx-seo';
import { DatePipe, registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    SharedModule,
    AdsModule,
    TransferHttpCacheModule,
    JsonLdModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
