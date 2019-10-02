import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Guid } from "guid-typescript";

import { SearchForm } from "../models/master";
import { Student } from "../models/student";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { StudentType } from "../models/student-type.model";
import { StudentFeeDiscount } from "../models/student-fee-discount";

@Injectable()
export class StudentService {

  searchUrl: string = "student/search";
  registerStudentUrl: string = "student/register";
  readmitStudentUrl: string = "student/readmission";
  studentTypeUrl: string = "student/studenttype";
  deleteStudentTypeUrl: string = "student/deletestutype";
  editStudentTypeUrl: string = "student/editstutype";
  addStudentTypeUrl: string = "student/addstutype";
  deleteFeeDiscountUrl: string = "student/deletefeediscount";
  editFeeDiscountUrl: string = "student/editfeediscount";
  addFeeDiscountUrl: string = "student/addfeediscount";
  feeDiscountUrl: string = "student/feediscount";
  constructor(private _http: HttpClient) { }

  /**
   * registerStudent
   */
  public registerStudent(student: Student): Observable<Student> {
    return this._http
      .post<Student>(
        environment.apiBaseURL + "/" + this.registerStudentUrl,
        student
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
   * search(searchForm:SearchForm)
   **/
  public search(searchForm: SearchForm): Observable<Array<Student>> {
    return this._http
      .post<Array<Student>>(
        environment.apiBaseURL + "/" + this.searchUrl,
        searchForm
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
   * readmission
   */
  public readmission(student: Student) {
    return this._http
      .post<Student>(
        environment.apiBaseURL + "/" + this.readmitStudentUrl,
        student
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
   * addstudenttype
   * @param studentType 
   */
  addstudenttype(studentType: StudentType): Observable<Array<StudentType>> {
    return this._http.post<Array<StudentType>>(
      environment.apiBaseURL + "/" + this.addStudentTypeUrl, studentType)
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
   * editstudenttype
   * @param studentType 
   */
  editstudenttype(studentType: StudentType): Observable<Array<StudentType>> {
    return this._http.post<Array<StudentType>>(
      environment.apiBaseURL + "/" + this.editStudentTypeUrl, studentType)
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
   * deletestudenttype
   * @param studentTypeId 
   */
  deletestudenttype(studentType: StudentType): Observable<Array<StudentType>> {
    return this._http.post<Array<StudentType>>(
      environment.apiBaseURL + "/" + this.deleteStudentTypeUrl, studentType)
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
   * studentType
   */
  public studentType(): Observable<Array<StudentType>> {
    return this._http
      .get<Array<StudentType>>(
        environment.apiBaseURL + "/" + this.studentTypeUrl
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
   * studentfeediscount
   */
  studentfeediscount(): Observable<Array<StudentFeeDiscount>> {
    return this._http
      .get<Array<StudentType>>(
        environment.apiBaseURL + "/" + this.feeDiscountUrl
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
   * deletefeediscount
   * @param studentFeeDiscount 
   */
  deletefeediscount(studentFeeDiscount: StudentFeeDiscount): Observable<Array<StudentFeeDiscount>> {
    return this._http.post<Array<StudentType>>(
      environment.apiBaseURL + "/" + this.deleteFeeDiscountUrl, studentFeeDiscount)
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
   * editfeediscount
   * @param studentFeeDiscount 
   */
  editfeediscount(studentFeeDiscount: StudentFeeDiscount): Observable<Array<StudentFeeDiscount>> {
    return this._http.post<Array<StudentType>>(
      environment.apiBaseURL + "/" + this.editFeeDiscountUrl, studentFeeDiscount)
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
   * addfeediscount
   * @param studentFeeDiscount 
   */
  addfeediscount(studentFeeDiscount: StudentFeeDiscount): Observable<Array<StudentFeeDiscount>> {
    return this._http.post<Array<StudentType>>(
      environment.apiBaseURL + "/" + this.addFeeDiscountUrl, studentFeeDiscount)
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
