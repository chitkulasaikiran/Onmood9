import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {ApiUrls} from './../constants/ApiUrls';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
 
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public getModuleSessions()
  {
    return this.httpClient.get(ApiUrls.GET_MODULE_SESSIONS_URL).pipe(retry(3),catchError(this.handleError));

  }

  public getUserVisitedCategories()
  {
    const currentUser = this.storageService.getCurrentUser();
    return this.httpClient.get(ApiUrls.GET_VISITED_CATEGORIES+currentUser.id).pipe(retry(3),catchError(this.handleError));

  }
  public getUserPlayedSessionsWithDateRange(payload:any)
  {
    return this.httpClient.post(ApiUrls.GET_PLAYED_SESSION_DATE_RANGE,payload).pipe(retry(3),catchError(this.handleError));

  }

  public getUserPlayedSessionsWithDateRangeAllCategories(payload:any)
  {
    return this.httpClient.post(ApiUrls.GET_ALL_CAT_PLAYED_SESSION_DATE_RANGE,payload).pipe(retry(3),catchError(this.handleError));

  }

  
}
