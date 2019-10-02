import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Parent } from "../models/parent";
import { environment } from "../../environments/environment";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class ParentService {
  registerParentUrl: string = "parent/register";
  constructor(private _http: HttpClient) {}

  /**
   * registerParent
   */
  public registerParent(parent: Array<Parent>) {
    return this._http
      .post<string>(
        environment.apiBaseURL + "/" + this.registerParentUrl,
        parent
      )
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
