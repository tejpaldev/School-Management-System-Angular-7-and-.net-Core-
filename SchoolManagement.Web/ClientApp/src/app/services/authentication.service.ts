import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

import { GlobalVariableService } from "./global-variable.service";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class AuthenticationService {
  private tokenKey: string = "token";
  private tokenUrl: string = "user/authenticate";
  private refreshTokenKey: string = "refresh";
  private cachedRequests: Array<HttpRequest<any>> = [];
  constructor(
    private _http: HttpClient,
    private globalVar: GlobalVariableService
  ) {}
  public generateToken(username: string, password: string): Observable<string> {
    //const userDetail: any = `grant_type=password&username=${username}&password=${password}`;
    const userDetail: any = { Username: username, Password: password };
    return this._http
      .post<string>(environment.apiBaseURL + "/" + this.tokenUrl, userDetail)
      .pipe(
        tap((token: any) => {
          // token.access_token = token.access_token;
          // sessionStorage.setItem(this.tokenKey, JSON.stringify(token.access_token));
          //sessionStorage.setItem(this.tokenKey, token.access_token);
          sessionStorage.setItem(this.tokenKey, token.Token);
          //sessionStorage.setItem(this.refreshTokenKey, token.refresh_token);
          this.globalVar.setAthentication(true);
          //return token.access_token;
          return token.Token;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  public refreshToken(): Observable<string> {
    let token = sessionStorage.getItem(this.refreshTokenKey);
    const userDetail: any = `grant_type=refresh_token&refresh_token=${token}`;
    return this._http
      .post<string>(environment.apiBaseURL + "/" + this.tokenUrl, userDetail)
      .pipe(
        tap((token: any) => {
          // token.access_token = token.access_token;
          // sessionStorage.setItem(this.tokenKey, JSON.stringify(token.access_token));
          sessionStorage.setItem(this.tokenKey, token.access_token);
          sessionStorage.setItem(this.refreshTokenKey, token.refresh_token);
          return token.access_token;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
