import { OverlayContainer } from "@angular/cdk/overlay";
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule
} from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { SchoolGuard } from "./guard/school.guard";
import { HomeComponent } from "./home/home.component";
import { httpInterceptorProviders } from "./interceptor/interceptor.provider";
import { ProfileDailogComponent } from "./profile-dailog/profile-dailog.component";
import { SchCoreModule } from "./sch-core/sch-core.module";
import { SchoolComponent } from "./school.component";
import { AuthenticationService } from "./services/authentication.service";
import { ClassService } from "./services/class.service";
import { FeeService } from "./services/fee.service";
import { LoadingService } from "./services/loading.service";
import { MasterDataService } from "./services/master-data.service";
import { MessageService } from "./services/message.service";
import { ParentService } from "./services/parent.service";
import { RoleService } from "./services/role.service";
import { StudentService } from "./services/student.service";
import { TransportService } from "./services/transport.service";
import { UserManageService } from "./services/user-manage.service";
import { RequestCacheService } from "./services/request-cache.service";
import { SchoolRoutingModule } from "./school-routing.module";
import { SchSharedModule } from "./sch-shared/sch-shared.module";
import { GlobalVariableService } from "./services/global-variable.service";
import { ReportService } from './services/report.service';

@NgModule({
  declarations: [
    SchoolComponent,
    DashboardComponent,
    ProfileDailogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'school-management-web' }),
    BrowserAnimationsModule,
    SchCoreModule,
    SchoolRoutingModule,
    SchSharedModule
  ],
  providers: [
    Title,
    SchoolGuard,
    GlobalVariableService,
    MasterDataService,
    ClassService,
    FeeService,
    TransportService,
    StudentService,
    ParentService,
    RoleService,
    UserManageService,
    LoadingService,
    AuthenticationService,
    MessageService,
    ReportService,
    RequestCacheService,
    httpInterceptorProviders
  ],
  entryComponents: [SchoolComponent, ProfileDailogComponent]
})
export class SchoolModule {
  constructor(
    private _resolver: ComponentFactoryResolver,
    private overlayContainer: OverlayContainer
  ) {
    //overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    const factory: ComponentFactory<
      SchoolComponent
    > = this._resolver.resolveComponentFactory(SchoolComponent);
    // this._registry.getTargets(factory.componentType).forEach((target: string) => {
    //   // factory.selector = target;
    //   appRef.bootstrap(factory);
    // });
    appRef.bootstrap(factory);
  }
}
