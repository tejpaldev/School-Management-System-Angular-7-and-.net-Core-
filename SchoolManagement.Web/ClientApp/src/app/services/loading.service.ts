import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { LoaderState } from "../models/loader-state.model";

@Injectable()
export class LoadingService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  public show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  public hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
