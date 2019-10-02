import { SchSharedModule } from "../sch-shared/sch-shared.module";
import { NgModule } from "@angular/core";
import { SchCoreModule } from "../sch-core/sch-core.module";

import { SchAdmissionRoutingModule } from "./sch-admission-routing.module";
import { SchAdmissionComponent } from "./sch-admission.component";
import { AdmissionComponent } from "./admission/admission.component";
import { ReadmissionComponent } from "./readmission/readmission.component";

@NgModule({
  imports: [SchCoreModule, SchSharedModule, SchAdmissionRoutingModule],
  declarations: [
    SchAdmissionComponent,
    AdmissionComponent,
    ReadmissionComponent
  ],
  providers: []
})
export class SchAdmissionModule {}
