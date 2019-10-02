import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchLibraryComponent } from "./sch-library.component";
import { SchLibraryRoutingModule } from "./sch-library-routing.module";
@NgModule({
  imports: [CommonModule, SchLibraryRoutingModule],
  declarations: [SchLibraryComponent]
})
export class SchLibraryModule {}
