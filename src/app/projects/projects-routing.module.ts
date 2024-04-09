import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsPage } from './projects.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadChildren: () =>
          import('../projects-overview/projects-overview.module').then(
            (m) => m.ProjectsOverviewPageModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../create-project/create-project.module').then(
            (m) => m.CreateProjectPageModule
          ),
      },
      {
        path: 'details/:name',
        loadChildren: () =>
          import('../project-details/project-details.module').then(
            (m) => m.ProjectDetailsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}
