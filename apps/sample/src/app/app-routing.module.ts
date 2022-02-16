import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { SponsorshipCandidateComponent } from './sponsorship/containers/sponsorship-candidate/sponsorship-candidate.component';

const routes: Routes = [
  {
    loadChildren: () => import('./info/info.module')
      .then(m => m.InfoModule),
    path: 'infos',
    data: { breadcrumb: 'Infos' }
  },
  {
    loadChildren: () => import('./sponsorship/sponsorship.module')
      .then(m => m.SponsorshipModule),
    path: '2022/parrainages-presidentielles',
    data: { breadcrumb: 'Parrainages' }
  },
  // {
  //   path: '', component: HomeComponent,  data: { breadcrumb: 'Home' }
  // },
  { path: '**', redirectTo: '2022/parrainages-presidentielles', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
