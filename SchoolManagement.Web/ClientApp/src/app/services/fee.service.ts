import { FeeDetails } from "../models/fee-details.model";
import { Guid } from "guid-typescript";
import { PayMode } from "../models/pay-mode.model";
import { Feetype } from "../models/feetype.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Fee } from "../models/fee.model";
import { Feeperiod } from "../models/feeperiod.model";
import { ClassFee } from "../models/classfee.model";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class FeeService {
  deleteClassFeeUrl: string = "fee/deleteclassfee";
  editClassFeeUrl: string = "fee/editclassfee";
  addClassFeeUrl: string = "fee/addclassfee";
  classFeeUrl: string = "fee/classfee";
  classFeeIdUrl: string = "fee/classfeebyid";
  deleteFeetypeUrl: string = "fee/deletetype";
  addFeetypeUrl: string = "fee/addtype";
  feeperiodUrl: string = "fee/feeperiod";
  feetypeUrl: string = "fee/feetype";
  feeDetailUrl: string = "fee/details/";
  payUrl: string = "fee/pay";
  paymentModeUrl: string = "fee/paymentmode";
  feeTypeUrl: string = "fee/types";
  constructor(private _http: HttpClient) {}

  /**
   * addtype
   */
  public addtype(feetype: Feetype): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.addFeetypeUrl, feetype)
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
   * deletetype
   */
  public deletetype(feetypeId: Guid): Observable<boolean> {
    let param = <Feetype>{ Id: feetypeId };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.deleteFeetypeUrl,
        param
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

  /**
   * types
   */
  public types(): Observable<Array<Feetype>> {
    return this._http
      .get<Array<Feetype>>(environment.apiBaseURL + "/" + this.feeTypeUrl)
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
   * paymentMode
   */
  public paymentMode(): Observable<Array<PayMode>> {
    return this._http
      .get<Array<PayMode>>(environment.apiBaseURL + "/" + this.paymentModeUrl)
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
   * pay
   */
  public pay(fees: Array<Fee>): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.payUrl, fees)
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
   * feeDetails
   */
  public feeDetails(studentId: Guid, classId: Guid): Observable<FeeDetails> {
    return this._http
      .get<FeeDetails>(
        environment.apiBaseURL +
          "/" +
          this.feeDetailUrl +
          studentId +
          "/" +
          classId
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

  /**
   * searchFeetype
   */
  public searchFeetype(feeType: Feetype): Observable<Feetype> {
    return this._http
      .post<Feetype>(environment.apiBaseURL + "/" + this.feetypeUrl, feeType)
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
   * feeperiod
   */
  public feeperiod(): Observable<Array<Feeperiod>> {
    return this._http
      .get<Array<Feeperiod>>(environment.apiBaseURL + "/" + this.feeperiodUrl)
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
   * classFee
   */
  public classFee(
    feetypeId?: Guid,
    classId?: Guid
  ): Observable<Array<ClassFee>> {
    let classfeeURL = environment.apiBaseURL + "/" + this.classFeeUrl;
    if (feetypeId) {
      classfeeURL = classfeeURL + "/" + feetypeId;
    } else if (classId) {
      classfeeURL = classfeeURL + "/" + Guid.createEmpty() + "/" + classId;
    }
    return this._http.get<Array<ClassFee>>(classfeeURL).pipe(
      tap((success: any) => {
        return success;
      }),
      catchError(error => {
        throw error.error.error_description;
      })
    );
  }

  /**
   * classFee
   */
  public classFeeById(classFeeId: Guid): Observable<ClassFee> {
    let classfeeURL = environment.apiBaseURL + "/" + this.classFeeUrl;
    return this._http
      .get<ClassFee>(
        environment.apiBaseURL + "/" + this.classFeeIdUrl + "/" + classFeeId
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

  /**
   * addClassFee
   */
  public addClassFee(classFee: ClassFee): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.addClassFeeUrl,
        classFee
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

  /**
   * editClassFee
   */
  public editClassFee(classFee: ClassFee): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.editClassFeeUrl,
        classFee
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

  /**
   * deleteClassFee
   */
  public deleteClassFee(classFeeId: Guid): Observable<boolean> {
    let classFee = <ClassFee>{ Id: classFeeId };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.deleteClassFeeUrl,
        classFee
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
