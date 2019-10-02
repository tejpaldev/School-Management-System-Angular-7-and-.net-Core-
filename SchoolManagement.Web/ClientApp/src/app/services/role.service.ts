import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Guid } from "guid-typescript";

import { Role } from "../models/role.model";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class RoleService {
  searchUrl: string = "role/search";
  deleteUrl: string = "role/delete";
  rolesUrl: string = "role/roles";
  addUrl: string = "role/add";
  constructor(private _http: HttpClient) {}

  /**
   * add
   */
  public add(role: Role): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.addUrl, role)
      .pipe(
        tap(success => {
          return success;
        })
      );
  }

  /**
   * search Role
   */
  search(role: Role): Observable<Role> {
    return this._http
      .post<Role>(environment.apiBaseURL + "/" + this.searchUrl, role)
      .pipe(
        tap(success => {
          return success;
        })
      );
  }

  /**
   * get Roles
   */
  public roles(): Observable<Array<Role>> {
    return this._http
      .get<Array<Role>>(environment.apiBaseURL + "/" + this.rolesUrl)
      .pipe(
        tap(success => {
          return success;
        })
      );
  }

  /**
   * delete
   */
  public delete(roleId: Guid): Observable<boolean> {
    let role = <Role>{ Id: roleId };
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.deleteUrl, role)
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
