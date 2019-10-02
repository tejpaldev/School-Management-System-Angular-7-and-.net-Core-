import { NgModule } from "@angular/core";
import { SchCoreModule } from "../sch-core/sch-core.module";

import { SchSharedModule } from "../sch-shared/sch-shared.module";
import { BusConfigComponent } from "./bus-config/bus-config.component";
import { BusrouteComponent } from "./busroute/busroute.component";
import { ClassConfigComponent } from "./class-config/class-config.component";
import { ClassComponent } from "./class/class.component";
import { ClassfeeComponent } from "./classfee/classfee.component";
import { FeeConfigComponent } from "./fee-config/fee-config.component";
import { FeetypeComponent } from "./feetype/feetype.component";
import { LocationComponent } from "./location/location.component";
import { RoleComponent } from "./role/role.component";
import { SchConfigRoutingModule } from "./sch-config-routing.module";
import { SchConfigComponent } from "./sch-config.component";
import { SectionComponent } from "./section/section.component";
import { StreamComponent } from "./stream/stream.component";
import { UserConfigComponent } from "./user-config/user-config.component";
import { UserComponent } from "./user/user.component";
import { CdkTableModule } from "@angular/cdk/table";
import { StudentTypeComponent } from './student-type/student-type.component';
import { StudentDiscountComponent } from './student-discount/student-discount.component';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
  imports: [SchCoreModule, SchSharedModule, SchConfigRoutingModule],
  declarations: [
    SchConfigComponent,
    ClassConfigComponent,
    UserConfigComponent,
    BusConfigComponent,
    FeeConfigComponent,
    ClassComponent,
    SectionComponent,
    StreamComponent,
    RoleComponent,
    UserComponent,
    LocationComponent,
    BusrouteComponent,
    FeetypeComponent,
    ClassfeeComponent,
    StudentTypeComponent,
    StudentDiscountComponent,
    AddEditComponent
  ],
  entryComponents: [AddEditComponent]
})
export class SchConfigModule { }
