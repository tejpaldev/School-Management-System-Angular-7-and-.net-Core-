import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ForgetpwdComponent } from './forgetpwd/forgetpwd.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SchCoreModule } from '../sch-core/sch-core.module';
import { SchUserRoutingModule } from './sch-user-routing.module';
import { SchUserComponent } from './sch-user.component';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    SchUserRoutingModule,
    SchCoreModule
  ],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ForgetpwdComponent,
    ProfileComponent,
    SchUserComponent
  ],
  providers: [UserService],
  entryComponents: []
})
export class SchUserModule { }
