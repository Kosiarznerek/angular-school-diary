import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';
import {MarksClassesComponent} from './marks-classes/marks-classes.component';
import {MarksSubjectsComponent} from './marks-subjects/marks-subjects.component';
import {MarksViewsComponent} from './marks-views/marks-views.component';
import {MarksFormComponent} from './marks-form/marks-form.component';
import {MarksFormResolver} from './marks-form/marks-form.resolver';
import {LessonsClassesComponent} from './lessons-classes/lessons-classes.component';
import {LessonsSubjectsComponent} from './lessons-subjects/lessons-subjects.component';
import {LessonsViewComponent} from './lessons-view/lessons-view.component';
import {LessonsDetailsComponent} from './lessons-details/lessons-details.component';
import {LessonsFormComponent} from './lessons-form/lessons-form.component';
import {LessonsFormResolver} from './lessons-form/lessons-form.resolver';
import {NotesViewComponent} from './notes-view/notes-view.component';
import {NotesFormComponent} from './notes-form/notes-form.component';
import {NotesFormResolver} from './notes-form/notes-form.resolver';
import {StudentsViewComponent} from './students-view/students-view.component';
import {StudentsDetailsComponent} from './students-details/students-details.component';
import {ScheduleClassesComponent} from './schedule-classes/schedule-classes.component';
import {ScheduleViewComponent} from './schedule-view/schedule-view.component';

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
      {
        path: 'lessons', data: {
          hiddenChildren: true,
          displayName: 'Zajęcia i frekwencja',
          description: 'Tutaj możesz zarządzać zajęciami i frewekncją studentów'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'classes'},
          {path: 'classes', component: LessonsClassesComponent},
          {path: 'classes/:classId', component: LessonsSubjectsComponent},
          {path: 'classes/:classId/:scheduleId', component: LessonsViewComponent},
          {
            path: 'classes/:classId/:scheduleId/form', component: LessonsFormComponent, resolve: {
              data: LessonsFormResolver,
            }
          },
          {path: 'classes/:classId/:scheduleId/:lessonId/details', component: LessonsDetailsComponent},
          {
            path: 'classes/:classId/:scheduleId/:lessonId/form', component: LessonsFormComponent, resolve: {
              data: LessonsFormResolver,
            }
          },
        ]
      },
      {
        path: 'notes', data: {
          hiddenChildren: true,
          displayName: 'Uwagi',
          description: 'Tutaj możesz zarządzać uwagami studentów'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'view'},
          {path: 'view', component: NotesViewComponent},
          {
            path: 'form', component: NotesFormComponent, resolve: {
              data: NotesFormResolver,
            }
          },
          {
            path: ':noteId/form', component: NotesFormComponent, resolve: {
              data: NotesFormResolver,
            }
          },
        ]
      },
      {
        path: 'students', data: {
          hiddenChildren: true,
          displayName: 'Uczniowie',
          description: 'Tutaj znajdują się informacje o stundetach'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'view'},
          {path: 'view', component: StudentsViewComponent},
          {path: 'view/:studentId', component: StudentsDetailsComponent},
        ]
      },
      {
        path: 'schedule', data: {
          hiddenChildren: true,
          displayName: 'Plan zajęć',
          description: 'Tutaj znajduje się plan zajeć w poszczególnych klasach'
        }, children: [
          {path: '', pathMatch: 'full', redirectTo: 'classes'},
          {path: 'classes', component: ScheduleClassesComponent},
          {path: 'classes/:classId', component: ScheduleViewComponent},
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
