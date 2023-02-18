import { Injectable } from '@angular/core';
import { ApiUrls } from '../constants/ApiUrls';
import { User } from "../model/user";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storageService: StorageService) { }
  
  register(user: User) {
    return this.http.post<any>(ApiUrls.NEW_USER_SIGN_UP, user);
  }

  registerSocialUser(user: User) {
    return this.http.post<any>(ApiUrls.SOCIAL_USER_SIGN_UP, user);
  }


  checUserExist(user: User) {
    return this.http.post<any>(ApiUrls.CHECK_USER_EXIST_URL, user);
  }

  checkSocialUserExists(formData: any) {
    let input = new FormData();
    input.append("socialMediaType", formData.socialProvider);
    input.append("socialMediaEmail", formData.socialMediaEmail);
    input.append("socialMediaId", formData.socialMediaId);
    return this.http.post<any>(ApiUrls.SAVE_SOCIAL_USER_URL, input);

  }
  saveSocialUser(user: User) {
    return this.http.post<any>(ApiUrls.SAVE_SOCIAL_USER_URL, user);
  }
  updateSocialUserPassword(user: User) {
    return this.http.post<any>(ApiUrls.UPDATE_SOCIAL_USER_PASSWORD_URL, user);
  }

  saveSocialMediaUser(socialId: string, socialType: string, fname: string, lname: string, email: string){
    let input = new FormData();
    input.append("socialMediaId", socialId);
    input.append("socialMediaType", socialType);
    input.append("fname", fname);
    input.append("lname", lname);
    input.append("email", email);    
    return this.http.post<any>(ApiUrls.SAVE_SOCIAL_MEDIA_USER_URL, input);
  }

  
  

  sendCode(email: string) {
    let input = new FormData();
    input.append("email", email);
    return this.http.post<any>(ApiUrls.PASSWORD_RESET_CODE_URL, input)
      .pipe(map(response => {  
          return response;
      }));
  }
  verifyCode(email: string, resetCode: string, inserted_code_id: string) {
    let input = new FormData();
    input.append("email", email);
    input.append("code", resetCode);
    input.append("insertedId", inserted_code_id)
    return this.http.post<any>(ApiUrls.VERIFY_RESET_CODE_URL, input)
      .pipe(map(response => {         
          return response;
      }));
  }

  verifyUserAccount(email: string, code: string) {
    let input = new FormData();
    input.append("email", email);
    input.append("code", code);
    // input.append("insertedId", inserted_code_id)
    return this.http.post<any>(ApiUrls.VERIFY_USER_ACCOUNT_URL, input)
      .pipe(map(response => { 
          return response;
      }));
  }

  verifyPasswordLink(email: string, resetCode: string) {
    let input = new FormData();
    input.append("email", email);
    input.append("code", resetCode);
    // input.append("insertedId", inserted_code_id)
    return this.http.post<any>(ApiUrls.IS_RESET_CODE_VERIFIED_URL, input)
      .pipe(map(response => { 
          return response;
      }));
  }

  setUserPassword(email: string, resetLink: string, newPassword: string) {
    let input = new FormData();
    input.append("email", email);
    input.append("code", resetLink);
    input.append("newPassword", newPassword)
    return this.http.post<any>(ApiUrls.SET_USER_PASSWORD_URL, input)
      .pipe(map(response => { 
          return response;
      }));
  }

  updatePersonalInfo(inputObject: any) {
    let input = new FormData();
    input.append("userId", inputObject.userId);
    input.append("fname", inputObject.fname);
    input.append("contact", inputObject.contact);
    input.append("email", inputObject.email)
    return this.http.post<any>(ApiUrls.UPDATE_USER_PERSONAL_INFO_URL, input)
      .pipe(map(response => {    
          return response;
      }));
  }
  updateUserPassword(inputObject:any) {
    let input = new FormData();
    // input.append("userId", inputObject.userId);
    input.append("email", inputObject.email);
    input.append("cpwd", inputObject.cpwd);
    input.append("npwd", inputObject.npwd);
    return this.http.post<any>(ApiUrls.CHANGE_USER_PASSWORD_URL, input)
      .pipe(map(response => { 
          return response;
      }));
  }

  

  isUserLoggedIn() {
    let isLoogedIn = false;
    let user = this.storageService.getCurrentUser();
    // console.log(user);
    if(user != null) {
      isLoogedIn = true;
    }
    return isLoogedIn;
  }

  getUserPlayedSessions(userId:number) {
    let url = ApiUrls.GET_USER_PLAYED_SESSIONS_URL.replace("{userId}", ""+userId);
		return this.http.get(url);
  }

  saveUserPlayedSession(payload:any) {
    return this.http.post<any>(ApiUrls.SAVE_USER_PLAYED_SESSION_URL, payload);
  }



  // Notifications
  getUserNotifications(userId:number) {
    let url = ApiUrls.GET_USER_NOTIFICATIONS_URL.replace("{userId}", ""+userId);
		return this.http.get(url);
  }



  // subscriptions
  getMySubscriptions(id: number) {
    return this.http.get<any>(ApiUrls.GET_USER_SUBSCRIPTIONS_URL+id);
  }
}
