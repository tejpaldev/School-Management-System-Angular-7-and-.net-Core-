import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SchCoreModule } from "../sch-core/sch-core.module";
import { RouterModule } from "@angular/router";

import { FileuploadComponent } from "./fileupload/fileupload.component";
import { FileService } from "./services/file.service";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { FeeHistoryComponent } from "./fee-history/fee-history.component";
import { LoadingComponent } from "./loading/loading.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { CarouselItemElementDirective } from "./directives/carousel-item-element.directive";
import { CarouselItemDirective } from "./directives/carousel-item.directive";
import { AdmissionPrintComponent } from "./admission-print/admission-print.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SearchComponent } from "./search/search.component";
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MenuSmallComponent } from './menu-small/menu-small.component';

@NgModule({
  imports: [SchCoreModule, RouterModule],
  exports: [
    FileuploadComponent,
    FeeHistoryComponent,
    LoadingComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemDirective,
    AdmissionPrintComponent,
    BreadcrumbComponent,
    SearchComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent
  ],
  declarations: [
    FileuploadComponent,
    ConfirmDialogComponent,
    FeeHistoryComponent,
    LoadingComponent,
    CarouselComponent,
    CarouselItemElementDirective,
    CarouselItemDirective,
    AdmissionPrintComponent,
    BreadcrumbComponent,
    SearchComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    MenuSmallComponent
  ],
  providers: [FileService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmDialogComponent, SearchComponent]
})
export class SchSharedModule { }
