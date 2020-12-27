import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';
import {MarksClassesComponent} from './marks-classes/marks-classes.component';
import {MarksSubjectsComponent} from './marks-subjects/marks-subjects.component';
import {MarksViewsComponent} from './marks-views/marks-views.component';
import {MarksFormComponent} from './marks-form/marks-form.component';
import {MarksFormResolver} from './marks-form/marks-form.resolver';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      {
        path: 'marks', data: {
          hiddenChildren: true,
          displayName: 'Oceny',
          description: 'Tutaj możesz zarządzać ocenami studentów'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'classes'},
          {path: 'classes', component: MarksClassesComponent},
          {path: 'classes/:classId', component: MarksSubjectsComponent},
          {path: 'classes/:classId/:scheduleId', component: MarksViewsComponent},
          {
            path: 'classes/:classId/:scheduleId/:studentId/form', component: MarksFormComponent, resolve: {
              data: MarksFormResolver,
            }
          },
          {
            path: 'classes/:classId/:scheduleId/:studentId/:markId/form', component: MarksFormComponent, resolve: {
              data: MarksFormResolver,
            }
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
