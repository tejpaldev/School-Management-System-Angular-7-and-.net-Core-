import { NgModule } from "@angular/core";
import { SchCoreModule } from "../sch-core/sch-core.module";
import { SchSharedModule } from "../sch-shared/sch-shared.module";

import { AccountComponent } from "./account/account.component";
import { FeePayComponent } from "./fee-pay/fee-pay.component";
import { FeeComponent } from "./fee/fee.component";
import { SchFinanceRoutingModule } from "./sch-finance-routing.module";
import { SchFinanceComponent } from "./sch-finance.component";
import { FeeCategoryComponent } from "./fee-category/fee-category.component";
import { FeeDetailComponent } from "./fee-detail/fee-detail.component";
import { FeeConfirmComponent } from "./fee-confirm/fee-confirm.component";

@NgModule({
  imports: [SchCoreModule, SchSharedModule, SchFinanceRoutingModule],
  declarations: [
    SchFinanceComponent,
    FeeComponent,
    AccountComponent,
    FeePayComponent,
    FeeCategoryComponent,
    FeeDetailComponent,
    FeeConfirmComponent
  ],
  entryComponents: [FeeConfirmComponent]
})
export class SchFinanceModule {}
