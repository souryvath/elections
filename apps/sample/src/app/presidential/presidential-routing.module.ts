import { PresidentialSheetComponent } from './containers/presidential-sheet/presidential-sheet.component';
import { PresidentialComponent } from './containers/presidential/presidential.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: PresidentialComponent,
    children: [
      {
        path: '',
        component: PresidentialSheetComponent,
        data: { breadcrumb: 'Election présidentielle 2022' }
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
