import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchoolGuard } from '../guard/school.guard';
import { ForgetpwdComponent } from './forgetpwd/forgetpwd.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SchUserComponent } from './sch-user.component';

const userRoutes: Routes = [
  { path: '', component: SchUserComponent, data: { title: 'User Dashboard' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'registration', component: RegistrationComponent, data: { title: 'Register' } },
  { path: 'forgetpwd', component: ForgetpwdComponent, data: { title: 'Forget Password' } },
  { path: 'profile', component: ProfileComponent, canActivate: [SchoolGuard], data: { title: 'Profile' } }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class SchUserRoutingModule { }
