import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "../../environments/environment";
import { Guid } from "guid-typescript";
import { catchError, map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class UserManageService {
  deleteUrl: string = "user/delete";
  updateUrl: string = "user/update";
  searchUrl: string = "user/search";
  private addUrl: string = "user/add";
  constructor(private _http: HttpClient) {}

  /**
   *  Add User
   */
  public add(user: User): Observable<boolean> {
    // return this._http.post<boolean>(environment.apiBaseURL + "/" + this.addUrl, user)
    //   .pipe(
    //   tap((success:any)=>{return success;}),
    //   catchError(error=>{throw error.error.error_description;}));
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.addUrl, user)
      .pipe(
        tap((success: any) => {
          return success;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  /**
   *  search User
   */
  public search(user: User): Observable<User> {
    return this._http
      .post<User>(environment.apiBaseURL + "/" + this.searchUrl, user)
      .pipe(
        tap((success: any) => {
          return success;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  /**
   * update User
   */
  public update(user: User): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.updateUrl, user)
      .pipe(
        tap((success: any) => {
          return success;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  /**
   * delete User
   */
  public delete(userId: Guid): Observable<boolean> {
    let user = <User>{ Id: userId };
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.deleteUrl, user)
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
