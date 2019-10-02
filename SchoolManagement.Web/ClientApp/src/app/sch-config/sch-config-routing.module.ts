import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SchoolGuard } from "../guard/school.guard";
import { SchConfigComponent } from "./sch-config.component";
import { ClassConfigComponent } from "./class-config/class-config.component";
import { FeeConfigComponent } from "./fee-config/fee-config.component";
import { BusConfigComponent } from "./bus-config/bus-config.component";
import { UserConfigComponent } from "./user-config/user-config.component";
import { StudentTypeComponent } from "./student-type/student-type.component";
import { StudentDiscountComponent } from "./student-discount/student-discount.component";

const routes: Routes = [
  {
    path: "",
    component: SchConfigComponent,
    canActivate: [SchoolGuard],
    data: { title: "Configration" }
  },
  {
    path: "class",
    canActivate: [SchoolGuard],
    component: ClassConfigComponent,
    data: { title: "Class Configration" }
  },
  {
    path: "user",
    canActivate: [SchoolGuard],
    component: UserConfigComponent,
    data: { title: " User Configration" }
  },
  {
    path: "bus",
    canActivate: [SchoolGuard],
    component: BusConfigComponent,
    data: { title: " Bus Route Configration" }
  },
  {
    path: "fee",
    canActivate: [SchoolGuard],
    component: FeeConfigComponent,
    data: { title: "Fee Configration" }
  },
  {
    path: "studenttype",
    canActivate: [SchoolGuard],
    component: StudentTypeComponent,
    data: { title: "Student Type" }
  },
  {
    path: "studentdiscount",
    canActivate: [SchoolGuard],
    component: StudentDiscountComponent,
    data: { title: "Student Fee Discount" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchConfigRoutingModule {}
