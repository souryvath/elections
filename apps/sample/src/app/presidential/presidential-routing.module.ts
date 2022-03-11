import { PresidentialCandidateSheetComponent } from './containers/presidential-candidate-sheet/presidential-candidate-sheet.component';
import { PresidentialCandidateHomeComponent } from './containers/presidential-candidate-home/presidential-candidate-home.component';
import { PresidentialSheetComponent } from './containers/presidential-sheet/presidential-sheet.component';
import { PresidentialComponent } from './containers/presidential/presidential.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PresidentialHomeComponent } from './containers/presidential-home/presidential-home.component';

export const routes: Routes = [
  {
    path: '',
    component: PresidentialComponent,
    children: [
      {
        path: '',
        component: PresidentialHomeComponent,
        data: { breadcrumb: 'Election présidentielle 2022' }
      },
      {
        path: 'candidats',
        children: [
          {
            path: '',
            component: PresidentialCandidateHomeComponent,
            data: { breadcrumb: 'Candidats' },
          },
          {
            path: ':slugCandidate',
            component: PresidentialCandidateSheetComponent,
            data: { breadcrumbAlias: 'candidate' }
          }
        ]
      },
      {
        path: ':region',
        component: PresidentialSheetComponent,
        children: [
          {
            path: ':departement',
            component: PresidentialSheetComponent,
            children: [
              {
                path: ':city',
                component: PresidentialSheetComponent
              },
            ]
          },
        ]
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
export class PresidentialRoutingModule {
}
