import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { LoaderState } from "../../models/loader-state.model";
import { LoadingService } from "../../services/loading.service";

@Component({
  selector: "school-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  public show = false;
  private subscription: Subscription;
  constructor(private loaderService: LoadingService) {}
  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
