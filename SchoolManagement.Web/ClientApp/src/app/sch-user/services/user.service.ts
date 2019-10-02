import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

import { User } from "../../models/user";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class UserService {
  private registerUrl: string = "user/register";
  private tokenKey: string = "token";
  private refreshTokenKey: string = "refresh";

  constructor(private _http: HttpClient) {}

  /**
   * User Registration
   */
  public register(user: User): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.registerUrl, user)
      .pipe(
        tap((success: any) => {
          return success;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }
}
