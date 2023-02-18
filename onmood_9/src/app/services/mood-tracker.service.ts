import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../constants/ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class MoodTrackerService {

  constructor(private http: HttpClient) { }

  saveMoodsData(payload:any) {
    return this.http.post<any>(ApiUrls.POST_MOODS, payload);
  }
  getUserMoodsData(payload:any) {

    return this.http.post<any>(ApiUrls.POST_USER_MOODS_DATA, payload);

  }
}