import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './views/sign-in/sign-in.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {ParentComponent} from './views/parent/parent.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
  {path: 'sign-in', canActivate: [AuthenticationGuard], component: SignInComponent},
  {
    path: 'administrator',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./views/administrator/administrator.module').then(r => r.AdministratorModule)
  },
  {
    path: 'student/:studentId',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./views/student/student.module').then(r => r.StudentModule)
  },
  {
    path: 'parent',
    canActivate: [AuthenticationGuard],
    component: ParentComponent,
  },
  {
    path: 'teacher',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./views/teacher/teacher.module').then(r => r.TeacherModule)
  },
  {path: 'not-found', component: NotFoundComponent},
  // {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
