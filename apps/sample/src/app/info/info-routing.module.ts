import { SharedModule } from './../shared/shared.module';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { CookiesComponent } from './cookies/cookies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CguComponent } from './cgu/cgu.component';

export const infoRoutes: Routes = [
  {
    component: CookiesComponent,
    path: 'cookies',
  },
  {
    component: CguComponent,
    path: 'cgu',
  },
  {
    component: LegalNoticesComponent,
    path: 'mentions-legales',
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(infoRoutes)
  ]
})
export class InfoRoutingModule {
}
