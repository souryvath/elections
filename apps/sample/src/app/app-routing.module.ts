import { SponsorshipHomeComponent } from './sponsorship/containers/sponsorship-home/sponsorship-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './sponsorship/containers/home/home.component';
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
    path: 'parrainages-presidentielle-2022',
    data: { breadcrumb: 'Parrainages présidentielle 2022' }
  },
  {
    path: '', component: HomeComponent,  data: { breadcrumb: 'Accueil' }
  },
  // {
  //   path: '', component: HomeComponent,  data: { breadcrumb: 'Home' }
  // },
  { path: '**', redirectTo: 'parrainages-presidentielle-2022', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
