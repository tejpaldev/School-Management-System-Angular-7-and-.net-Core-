import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

import { Busroute, Location } from "../models/transport";
import { Guid } from "guid-typescript";
import { tap, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class TransportService {
  busrouteDeleteUrl: string = "transport/deletebusroute";
  busrouteAddUrl: string = "transport/addbusroute";
  busrouteEditUrl: string = "transport/editbusroute";
  locationAddUrl: string = "transport/addlocation";
  locationEditUrl: string = "transport/editlocation";
  locationDeleteUrl: string = "transport/deletelocation";
  locationSearchUrl: string = "transport/searchlocation";
  busrouteSearchUrl: string = "transport/searchbusroute";
  busrouteUrl: string = "transport/busroute";
  locationUrl: string = "transport/location";
  constructor(private _http: HttpClient) {}

  /**
   * location
   */
  public location(): Observable<Array<Location>> {
    return this._http
      .get<Array<Location>>(environment.apiBaseURL + "/" + this.locationUrl)
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
   * Busroute
   */
  public Busroute(locationId: string): Observable<Array<Busroute>> {
    return this._http
      .get<Array<Busroute>>(
        environment.apiBaseURL + "/" + this.busrouteUrl + "/" + locationId
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
   * search Busroute
   */
  public searchbus(busroute: Busroute): Observable<Busroute> {
    return this._http
      .post<Busroute>(
        environment.apiBaseURL + "/" + this.busrouteSearchUrl,
        busroute
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
   * delete busroute
   */
  public deletebusroute(busrouteId: Guid): Observable<boolean> {
    let busroute = <Busroute>{
      Id: busrouteId
    };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.busrouteDeleteUrl,
        busroute
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
   * edit Busroute
   */
  public editbusroute(busroute: Busroute): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.busrouteEditUrl,
        busroute
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
   * add busroute
   */
  public addbusroute(busroute: Busroute): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.busrouteAddUrl,
        busroute
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
   * search location
   */
  public searchlocation(location: Location): Observable<Location> {
    return this._http
      .post<Location>(
        environment.apiBaseURL + "/" + this.locationSearchUrl,
        location
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
   * delete location
   */
  public deletelocation(locationId: Guid): Observable<boolean> {
    let location = <Location>{
      Id: locationId
    };
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.locationDeleteUrl,
        location
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
   * edit location
   */
  public editlocation(location: Location): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.locationEditUrl,
        location
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
   * add location
   */
  public addlocation(location: Location): Observable<boolean> {
    return this._http
      .post<boolean>(
        environment.apiBaseURL + "/" + this.locationAddUrl,
        location
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
