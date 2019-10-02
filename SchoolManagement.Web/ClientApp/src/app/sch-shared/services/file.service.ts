import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';


@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }

  upload(files, parameters) {
    const httpOptions = {
      params: parameters
    };
    // options.params = parameters;
    return this.http.post(environment.apiBaseURL + 'upload', files, httpOptions)
    .pipe(
      tap(response => response)
    );

  }
  getImages() {
    return this.http.get(environment.apiBaseURL + "getimages")
    .pipe(
      tap(response => response)
    );
  }

}
