import {
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RequestCacheService } from "../services/request-cache.service";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

const searchUrl = "/master/";
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {}

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
    // continue if not cachable.
    if (!isCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);
    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(req, next, this.cache);
  }
}

/** Is this request cachable? */
function isCachable(req: HttpRequest<any>) {
  // Only GET requests are cachable
  return (
    req.method === "GET" &&
    // Only npm package search is cachable in this app
    req.url.indexOf(searchUrl) > -1
  );
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCacheService
): Observable<HttpEvent<any>> {
  // No headers allowed in npm search request
  // const noHeaderReq = req.clone({ headers: new HttpHeaders() });

  return next.handle(req).pipe(
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event); // Update the cache.
      }
    })
  );
}
