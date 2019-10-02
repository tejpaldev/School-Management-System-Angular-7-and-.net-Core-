import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {
  Gender,
  BloodGroup,
  Category,
  Religion,
  ParentType
} from "../models/master";
import { Status } from "../models/status.model";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class MasterDataService {
  statusUrl: string = "master/status";
  private parentTypeUrl: string = "master/parenttype";
  private religionUrl: string = "master/religion";
  private categoryUrl: string = "master/category";
  private bloodGroupUrl: string = "master/bloodgroup";
  private genderUrl: string = "master/gender";
  constructor(private _http: HttpClient) {}

  /**
   * gender
   */
  public gender(): Observable<Array<Gender>> {
    return this._http
      .get<Array<Gender>>(environment.apiBaseURL + "/" + this.genderUrl)
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
   * bloodGroup
   */
  public bloodGroup(): Observable<Array<BloodGroup>> {
    return this._http
      .get<Array<BloodGroup>>(environment.apiBaseURL + "/" + this.bloodGroupUrl)
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
   * category
   */
  public category(): Observable<Array<Category>> {
    return this._http
      .get<Array<Category>>(environment.apiBaseURL + "/" + this.categoryUrl)
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
   * religion
   */
  public religion(): Observable<Array<Religion>> {
    return this._http
      .get<Array<Religion>>(environment.apiBaseURL + "/" + this.religionUrl)
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
   * parentType
   */
  public parentType(): Observable<Array<ParentType>> {
    return this._http
      .get<Array<ParentType>>(environment.apiBaseURL + "/" + this.parentTypeUrl)
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
   * status
   */
  public status(): Observable<Array<Status>> {
    return this._http
      .get<Array<Status>>(environment.apiBaseURL + "/" + this.statusUrl)
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
