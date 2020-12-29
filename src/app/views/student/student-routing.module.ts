import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from '../../components/navigation/navigation.component';
import {NotesComponent} from './notes/notes.component';
import {InformationComponent} from './information/information.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      {
        path: 'notes', component: NotesComponent, data: {
          displayName: 'Uwagi',
          description: 'Tutaj znajdują się uwagi studenta'
        }
      },
      {
        path: 'information', component: InformationComponent, data: {
          displayName: 'Informacje o klasie',
          description: 'Tutaj znajdują się informacje o klasie studenta'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
