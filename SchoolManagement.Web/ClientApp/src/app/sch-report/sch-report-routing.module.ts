import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchoolGuard } from "../guard/school.guard";

import { FeeReportComponent } from "./fee-report/fee-report.component";
import { SchReportComponent } from "./sch-report.component";
import { StudentReportComponent } from "./student-report/student-report.component";
import { AdmissionReportComponent } from "./admission-report/admission-report.component";

const routes: Routes = [
  {
    path: "",
    component: SchReportComponent,
    canActivate: [SchoolGuard],
    data: { title: "Report Dashboard" }
  },
  {
    path: "feereport",
    component: FeeReportComponent,
    canActivate: [SchoolGuard],
    data: { title: "Fee Reports" }
  },
  {
    path: "studentreport",
    component: StudentReportComponent,
    canActivate: [SchoolGuard],
    data: { title: "Student Reports" }
  },
  {
    path: "admissionreport",
    component: AdmissionReportComponent,
    canActivate: [SchoolGuard],
    data: { title: "Admission Reports" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchReportRoutingModule {}
