import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolGuard } from '../guard/school.guard';

import { AdmissionComponent } from './admission/admission.component';
import { ReadmissionComponent } from './readmission/readmission.component';
import { SchAdmissionComponent } from './sch-admission.component';

const routes: Routes = [
  { path: '', component: SchAdmissionComponent, canActivate: [SchoolGuard], data: { title: 'Admission Dashboard' } },
  { path: 'admission', component: AdmissionComponent, canActivate: [SchoolGuard], data: { title: 'New Admission' } },
  { path: 'readmission', component: ReadmissionComponent, canActivate: [SchoolGuard], data: { title: 'Re Admission' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchAdmissionRoutingModule { }
