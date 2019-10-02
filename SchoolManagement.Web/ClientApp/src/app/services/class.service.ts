import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Guid } from "guid-typescript";

import { Class, ClassSection, Section, Stream } from "../models/class";
import { ClassStream } from "../models/class";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class ClassService {
  private deleteStreamUrl: string = "class/deletestream";
  private addStreamUrl: string = "class/addstream";
  private deleteSectionUrl: string = "class/deletesection";
  private addSectionUrl: string = "class/addsection";
  private addClassStreamUrl: string = "class/addclassstream";
  private deleteClassStreamUrl: string = "class/deleteclassstream";
  private addClassSectionUrl: string = "class/addclasssection";
  private deleteClassSectionUrl: string = "class/deleteclasssection";
  private deleteClassUrl: string = "class/delete";
  private addClassUrl: string = "class/add";
  private streamUrl: string = "class/stream";
  private sectionUrl: string = "class/section";
  private classUrl: string = "class/class";
  private classStreamUrl: string = "class/classstream";
  private classSectionUrl: string = "class/classsection";
  constructor(private _http: HttpClient) {}

  /**
   * class
   */
  public class(): Observable<Array<Class>> {
    return this._http
      .get<Array<Class>>(environment.apiBaseURL + "/" + this.classUrl)
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
   * section list without class id
   */
  public sectionList(): Observable<Array<Section>> {
    return this._http
      .get<Array<Section>>(environment.apiBaseURL + "/" + this.sectionUrl)
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
   * section by class id
   */
  public section(classId: string): Observable<Array<Section>> {
    return this._http
      .get<Array<Section>>(
        environment.apiBaseURL + "/" + this.sectionUrl + "/" + classId
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
   * stream list without class id and/or section id
   */
  public streamList(): Observable<Array<Stream>> {
    return this._http
      .get<Array<Stream>>(environment.apiBaseURL + "/" + this.streamUrl)
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
   * stream by class and/or section id
   */
  public stream(
    classId: string,
    sectionId?: string
  ): Observable<Array<Stream>> {
    let streamURL: string =
      environment.apiBaseURL + "/" + this.streamUrl + "/" + classId;
    if (sectionId) streamURL = streamURL + "/" + sectionId;
    return this._http.get<Array<Stream>>(streamURL).pipe(
      tap((success: any) => {
        return success;
      }),
      catchError(error => {
        throw error.error.error_description;
      })
    );
  }

  /**
   * classSection
   */
  public classSection(
    classId?: Guid,
    sectionId?: Guid
  ): Observable<Array<ClassSection>> {
    let classSectionURL = environment.apiBaseURL + "/" + this.classSectionUrl;
    if (classId) {
      classSectionURL = environment.apiBaseURL + "/" + classId;
    } else if (sectionId) {
      classSectionURL = environment.apiBaseURL + "/" + "/" + sectionId;
    }
    return this._http.get<Array<ClassSection>>(classSectionURL).pipe(
      tap((success: any) => {
        return success;
      }),
      catchError(error => {
        throw error.error.error_description;
      })
    );
  }

  /**
   * classStream
   */
  public classStream(
    classId?: Guid,
    sectionId?: Guid,
    streamId?: Guid
  ): Observable<Array<ClassStream>> {
    let classStreamURL = environment.apiBaseURL + "/" + this.classStreamUrl;
    if (classId && !sectionId && !streamId) {
      classStreamURL = environment.apiBaseURL + "/" + classId;
    } else if (classId && sectionId && !streamId) {
      classStreamURL = environment.apiBaseURL + "/" + classId + "/" + sectionId;
    } else if (!classId && !sectionId && streamId) {
      classStreamURL = environment.apiBaseURL + "/" + "/" + "/" + streamId;
    }
    return this._http.get<Array<ClassStream>>(classStreamURL).pipe(
      tap((success: any) => {
        return success;
      }),
      catchError(error => {
        throw error.error.error_description;
      })
    );
  }

  public addclass(classes: Class): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.addClassUrl, classes)
      .pipe(
        tap((success: any) => {
          return success;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  public deleteclass(classId: Guid): Observable<boolean> {
    let classes = <Class>{ Id: classId };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.deleteClassUrl,
        classes
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

  public addclasssection(classsection: ClassSection): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.addClassSectionUrl,
        classsection
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

  public deleteclasssection(classsectionId: Guid): Observable<boolean> {
    let classsection = <ClassSection>{ Id: classsectionId };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.deleteClassSectionUrl,
        classsection
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

  public addclassStream(classstream: ClassStream): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.addClassStreamUrl,
        classstream
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

  public deleteclassStream(classstreamId: Guid): Observable<boolean> {
    let classstream = <ClassStream>{ Id: classstreamId };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.deleteClassStreamUrl,
        classstream
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

  public addsection(section: Section): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.addSectionUrl, section)
      .pipe(
        tap((success: any) => {
          return success;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  public deletesection(sectionId: Guid): Observable<boolean> {
    let section = <Section>{ Id: sectionId };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.deleteSectionUrl,
        section
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

  public addstream(stream: Stream): Observable<boolean> {
    return this._http
      .post<boolean>(environment.apiBaseURL + "/" + this.addStreamUrl, stream)
      .pipe(
        tap((success: any) => {
          return success;
        }),
        catchError(error => {
          throw error.error.error_description;
        })
      );
  }

  public deletestream(streamId: Guid): Observable<boolean> {
    let stream = <Stream>{ Id: streamId };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.deleteStreamUrl,
        stream
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
