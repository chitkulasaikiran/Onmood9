import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../constants/ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http:HttpClient) { }
  // Onmood9 Moods
  getAssessments(id: any) {

    return this.http.get<any>(ApiUrls.GET_ALL_ASSESSMENTS+id);
  }
  getAttendedAssessments(userId:number,testId:any) {
    return this.http.get<any>(ApiUrls.GET_ATTENDED_ASSESSMENTS_BY_ASSESSMENT+userId+'/'+testId);
  }
  saveAssessmentTest(payload:any){
    return this.http.post<any>(ApiUrls.POST_ASSESSMENT_TEST,payload);
  }

  testSecurityAPI() {
    return this.http.get<any>(ApiUrls.SECURITY_API_TEST_URL);
  }

  selectedTest:any = {};
}
