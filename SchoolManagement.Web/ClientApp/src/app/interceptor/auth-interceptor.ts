import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

const loginUrl = "/token";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenKey: string = "token";
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (req.url.indexOf(loginUrl) > -1) {
      return next.handle(req);
    }

    // Get the auth token from the service.
    const authToken = sessionStorage.getItem(this.tokenKey);

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    let authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${authToken}`).set("Content-Type","application/json")
      // setHeaders: {
      //   Authorization: `Bearer ${authToken}`
      // }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
