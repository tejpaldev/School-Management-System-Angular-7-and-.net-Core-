import { NgModule } from "@angular/core";
import { SchCoreModule } from "../sch-core/sch-core.module";

import { FeeReportComponent } from "./fee-report/fee-report.component";
import { SchReportRoutingModule } from "./sch-report-routing.module";
import { SchReportComponent } from "./sch-report.component";
import { FeeCollectionComponent } from "./fee-collection/fee-collection.component";
import { FeeDefaulterComponent } from "./fee-defaulter/fee-defaulter.component";
import { ReportFilterComponent } from "./report-filter/report-filter.component";
import { StudentProfileComponent } from "./student-profile/student-profile.component";
import { StudentReportComponent } from "./student-report/student-report.component";
import { AdmissionReportComponent } from "./admission-report/admission-report.component";
import { StudentProfileDetailComponent } from "./student-profile-detail/student-profile-detail.component";
import { ParentDetailComponent } from "./parent-detail/parent-detail.component";
import { FeeDetailComponent } from "./fee-detail/fee-detail.component";

@NgModule({
  imports: [SchCoreModule, SchReportRoutingModule],
  declarations: [
    SchReportComponent,
    FeeReportComponent,
    FeeCollectionComponent,
    FeeDefaulterComponent,
    ReportFilterComponent,
    StudentProfileComponent,
    StudentReportComponent,
    AdmissionReportComponent,
    StudentProfileDetailComponent,
    ParentDetailComponent,
    FeeDetailComponent
  ],
  entryComponents: [
    StudentProfileDetailComponent,
    FeeDetailComponent,
    ParentDetailComponent
  ]
})
export class SchReportModule {}
