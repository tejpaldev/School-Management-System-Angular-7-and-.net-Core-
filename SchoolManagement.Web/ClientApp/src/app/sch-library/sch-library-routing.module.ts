import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchLibraryComponent } from './sch-library.component';

const routes: Routes = [
  { path: '', component: SchLibraryComponent, data: { title: 'Home' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchLibraryRoutingModule { }
