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
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
];

function polishRangeLabel(page: number, pageSize: number, length: number): string {
  if (length === 0 || pageSize === 0) {
    return `0 z ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length
    ? Math.min(startIndex + pageSize, length)
    : startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} z ${length}`;
}

function getPolishPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Elementów na stronę:';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.lastPageLabel = 'Ostatnia strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  paginatorIntl.firstPageLabel = 'Pierwsza strona';
  paginatorIntl.getRangeLabel = polishRangeLabel;

  return paginatorIntl;
}

@NgModule({
  providers: [
    {provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl()}
  ],
  imports: material,
  exports: material,
})
export class AppMaterialModule {
}
