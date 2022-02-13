import { SponsorshipComponent } from './containers/sponsorship/sponsorship.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SponsorshipCandidateComponent } from './containers/sponsorship-candidate/sponsorship-candidate.component';

export const routes: Routes = [
  {
    path: '',
    component: SponsorshipComponent,
    children: [
      {
        path: ':slugCandidate',
        data: {
          breadcrumbAlias: 'slugCandidate',
        },
        children: [{
          path: '',
          component: SponsorshipCandidateComponent,
          data: { breadcrumbAlias: 'candidate' },
        }]
      }
    ]
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class SponsorshipRoutingModule {
}
