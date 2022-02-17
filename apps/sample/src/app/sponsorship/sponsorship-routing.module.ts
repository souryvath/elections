import { SponsorshipHomeComponent } from './containers/sponsorship-home/sponsorship-home.component';
import { SponsorshipComponent } from './containers/sponsorship/sponsorship.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SponsorshipCandidateComponent } from './containers/sponsorship-candidate/sponsorship-candidate.component';
import { SponsorshipHomeCandidateComponent } from './containers/sponsorship-home-candidate/sponsorship-home-candidate.component';
import { SponsorshipHomeDepartmentComponent } from './containers/sponsorship-home-department/sponsorship-home-department.component';
import { SponsorshipDepartmentComponent } from './containers/sponsorship-department/sponsorship-department.component';

export const routes: Routes = [
  {
    path: '',
    component: SponsorshipComponent,
    children: [
      {
        path: 'candidats',
        data: {
          breadcrumbAlias: 'slugCandidate',
        },
        children: [
          {
            path: '',
            component: SponsorshipHomeCandidateComponent,
            data: { breadcrumb: 'Parrainages par candidat' }
          },
          {
            path: ':slugCandidate',
            component: SponsorshipCandidateComponent,
            data: { breadcrumbAlias: 'candidate' },
          }
        ]
      },
      {
        path: 'departements',
        data: {
          breadcrumbAlias: 'slugDepartment',
        },
        children: [
          {
            path: '',
            component: SponsorshipHomeDepartmentComponent,
            data: { breadcrumb: 'Parrainages par département' }
          },
          {
            path: ':slugDepartment',
            component: SponsorshipDepartmentComponent,
            data: { breadcrumbAlias: 'department' },
          }
        ]
      },
      {
        path: '',
        component: SponsorshipHomeComponent
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
