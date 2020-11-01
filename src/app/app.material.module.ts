import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';

const material = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
];

@NgModule({
  imports: material,
  exports: material,
})
export class AppMaterialModule {
}
