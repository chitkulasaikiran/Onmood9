import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs/index';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Course} from '../model/course'
import { ApiUrls } from "../constants/ApiUrls";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
	//private readonly API_URL = 'http://jobsreboot.com/projects/md/server/index.php/api/Courses';
	// private readonly API_URL = 'http://localhost:8080/index.php/api/Courses';

	dataChange: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
	// Temporarily stores data from dialogs
	dialogData: any;

	constructor (private httpClient: HttpClient) {}

	get data(): Course[] {
		return this.dataChange.value;
	}
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
	

	getAllCourses(): Observable<Course[]> {
		return this.httpClient.get<Course[]>(ApiUrls.GET_ONMOOD9_MOODS_URL).pipe(retry(3),catchError(this.handleError));
	}
}
