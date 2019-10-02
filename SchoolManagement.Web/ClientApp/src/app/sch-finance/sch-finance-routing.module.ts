import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchoolGuard } from '../guard/school.guard';
import { AccountComponent } from './account/account.component';
import { FeeComponent } from './fee/fee.component';
import { SchFinanceComponent } from './sch-finance.component';

const routes: Routes = [
  { path: '', component: SchFinanceComponent, canActivate: [SchoolGuard], data: { title: 'Finance Dashboard' } },
  { path: 'fee', component: FeeComponent, canActivate: [SchoolGuard], data: { title: 'Fee Collection' } },
  { path: 'account', component: AccountComponent, canActivate: [SchoolGuard], data: { title: 'Accounts' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchFinanceRoutingModule { }
