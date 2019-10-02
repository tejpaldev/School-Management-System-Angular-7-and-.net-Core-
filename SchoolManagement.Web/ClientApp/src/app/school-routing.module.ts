import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolGuard } from './guard/school.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent, data: { title: 'Home' } },
{
  path: 'report',
  loadChildren: './sch-report/sch-report.module#SchReportModule'
},
{
  path: 'finance',
  loadChildren: './sch-finance/sch-finance.module#SchFinanceModule'
},
{
  path: 'admission',
  loadChildren: './sch-admission/sch-admission.module#SchAdmissionModule'
},
{
  path: 'user',
  loadChildren: './sch-user/sch-user.module#SchUserModule'
},
{
  path: 'config',
  loadChildren: './sch-config/sch-config.module#SchConfigModule'
},
{ path: 'dashboard', component: DashboardComponent, canActivate: [SchoolGuard], data: { title: 'Dashboard' } }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
