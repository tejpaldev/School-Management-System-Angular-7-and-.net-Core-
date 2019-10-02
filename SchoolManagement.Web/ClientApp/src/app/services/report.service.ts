import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ReportFilter } from "../models/report-filter";
import { tap, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { FeeReport } from "../models/fee-report";
import { StudentProfile } from "../models/student-profile.model";

@Injectable()
export class ReportService {
  private feeReportUrl: string = "report/feereport";
  private feeCollectionUrl: string = "report/feecollection";
  private defaulterStudentUrl: string = "report/defaulterstudent";
  private studentProfileUrl: string = "report/studentprofile";
  constructor(private _http: HttpClient) {}

  /**
   * feeCollection
   * @param filter : ReportFilter
   */
  public feeCollection(
    filter: ReportFilter
  ): Observable<Array<StudentProfile>> {
    return this._http.post<Array<StudentProfile>>(
      environment.apiBaseURL + "/" + this.feeCollectionUrl,
      filter
    ).pipe(
      tap((success: any) => {
        return success;
      }),
      catchError(error => {
        throw error.error.error_description;
      })
    );
  }

  /**
   * defaulterStudent
   * @param filter : ReportFilter
   */
  public defaulterStudent(
    filter: ReportFilter
  ): Observable<Array<StudentProfile>> {
    return this._http.post<Array<StudentProfile>>(
      environment.apiBaseURL + "/" + this.defaulterStudentUrl,
      filter
    ).pipe(
      tap((success: any) => {
        return success;
      }),
      catchError(error => {
        throw error.error.error_description;
      })
    );
  }

  /**
   * studentProfile
   * @param filter : ReportFilter
   */
  public studentProfile(
    filter: ReportFilter
  ): Observable<Array<StudentProfile>> {
    return this._http.post<Array<StudentProfile>>(
      environment.apiBaseURL + "/" + this.studentProfileUrl,
      filter
    ).pipe(
      tap((success: any) => {
        return success;
      }),
      catchError(error => {
        throw error.error.error_description;
      })
    );
  }
}
