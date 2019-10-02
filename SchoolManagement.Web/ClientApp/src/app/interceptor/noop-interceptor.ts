import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";

import { Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { finalize, tap } from "rxjs/operators";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  private count: number = 0;
  constructor(private lodingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.count++;
    if (this.count == 1) {
      this.lodingService.show();
    }
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count == 0) {
          this.lodingService.hide();
        }
      })
    );
  }
}
