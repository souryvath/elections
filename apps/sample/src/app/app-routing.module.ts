import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    loadChildren: () => import('./presidential/presidential.module')
      .then(m => m.PresidentialModule),
    path: 'resultats-presidentielle-2022',
    data: { breadcrumb: 'Election présidentielle 2022' }
  },
  {
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule),
    path: '',
    data: { breadcrumb: 'Accueil' }
  },
  { path: '**', redirectTo: 'resultats-presidentielle-2022', pathMatch: 'full' }
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
