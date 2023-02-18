import { Injectable,Output, EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';

import { ApiUrls } from '../constants/ApiUrls';
import { User } from "../model/user";
import { StorageService } from './storage.service';
import { CUNIQUE_ID, CURRENT_SUBSCRIPTION, CURRENT_USER, IS_LOGGEDIN, SESSION_EXPIRES_ON, TOKEN, UNAME, USER_TYPE } from '../constants/Constants';
import { DateUtil } from '../Utils/DateUtil';

declare var FB: any;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    @Output() getLoggedInUserEmail: EventEmitter<any> = new EventEmitter();
    @Output() userEvent: EventEmitter<any> = new EventEmitter();
    @Output() userLogoutEvent: EventEmitter<any> = new EventEmitter();
    @Output() fbUserLoginEvent: EventEmitter<any> = new EventEmitter();
    @Output() deviceBackButtonEvent: EventEmitter<any> = new EventEmitter();
    subsVar:any; // Subscription;

    private currentUserSubject: any;//: BehaviorSubject<User>;
    public currentUser: any;//: Observable<User>;

    constructor(private http: HttpClient, private router:Router, private storageService: StorageService) { 
        // this.subsVar = null;
        this.fbSetup();
    }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    public get currentUserValue(): User {
        if(!this.currentUserSubject) {
            let user = JSON.parse(this.storageService.getItem(CURRENT_USER) || "");
            this.currentUserSubject = new BehaviorSubject<User>(user);
            this.currentUser = this.currentUserSubject.asObservable();
            this.currentUserSubject.next(user);
        }
        return this.currentUserSubject ? this.currentUserSubject.value : null;
    }

    

    login(username: string, password: string) {
        let input = new FormData();
        input.append("email", username);
        // input.append("pwd", password);
        input.append("password", password);
        return this.http.post<any>(ApiUrls.USER_LOGIN_URL, input)
            .pipe(map(response => {
                // console.log("=======>" + JSON.stringify(response));
                return response;
            }));
    }
    storeUserInLocalStorage2(obj: any){
        // console.log(obj);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(obj.user));
        this.currentUser = this.currentUserSubject.asObservable();
        this.storageService.storeItem(CURRENT_USER, obj.user);        
        this.storageService.storeItem(UNAME, obj.name);
        this.storageService.storeItem(TOKEN, obj.token);
        this.storageService.storeItem(IS_LOGGEDIN, "true");
        this.storageService.storeItem(USER_TYPE, obj.user_type);
        this.storageService.storeItem(CUNIQUE_ID, obj.cunique_id);
        if(obj.haveSubscription) {
            this.storageService.storeItem(CURRENT_SUBSCRIPTION, JSON.stringify(obj.subscription));
        }
        this.storageService.storeItem(SESSION_EXPIRES_ON, JSON.stringify(DateUtil.getDateAfterDays(7)));
        this.userEvent.emit(true);
    }

    storeUserInLocalStorage(user: User){
        this.storageService.storeItem(CURRENT_USER, JSON.stringify(user));
        if(!this.currentUserSubject) {
            this.currentUserSubject = new BehaviorSubject<User>(user);
            this.currentUser = this.currentUserSubject.asObservable();
        }
        this.currentUserSubject.next(user);
        this.userEvent.emit(true);
    }

    logout() {
        this.storageService.clearStorage();
        // remove user from local storage and set current user to null
        // this.storageService.removeItem(CURRENT_USER);
        // this.storageService.removeItem(TOKEN);
        // this.storageService.storeItem(IS_LOGGEDIN, "false");

        if(this.currentUserSubject) this.currentUserSubject.next(null);
        this.userEvent.emit(false);
        this.userLogoutEvent.emit(true);
        // this.router.navigate(['/home']);
        // this.router.navigateByUrl('home', { skipLocationChange: true })
        //     .then(() => {
        //         this.router.navigate(['home']);
        //     });
        
    }

    clearUser() {
        this.storageService.removeItem(CURRENT_USER);
        this.storageService.removeItem(TOKEN);
        this.storageService.storeItem(IS_LOGGEDIN, "false");
        if(this.currentUserSubject) this.currentUserSubject.next(null);
        this.userEvent.emit(false);
    }

    makeHeaderActiveEvent(courseId: number){
        this.deviceBackButtonEvent.emit(courseId);
    }

    /**Facebook login */
    fbSetup() {
        (window as any).fbAsyncInit = function() {
            FB.init({
                appId      : ApiUrls.FACEBOOK_APP_ID,
                cookie     : true,
                xfbml      : true,
                version    : 'v3.1'
            });
            FB.AppEvents.logPageView();
        };

        // (function(d, s, id){
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) {return;}
        //     js = d.createElement(s); js.id = id;
        //     js.src = ApiUrls.FACEBOOK_SDK_URL; //"https://connect.facebook.net/en_US/sdk.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        //     }(document, 'script', 'facebook-jssdk'));
    }

    doFacebookLogin() {
        let responseObject = {
            status : false,
            fbResponseData: {}
        };
        // FB.login();
        FB.login((response: any) => {
            if (response.status === "connected") {
                //login success
                //login success code here
                //redirect to home page
                let accessToken = response.authResponse.accessToken;
                let userId = response.authResponse.userID;
                let url = ApiUrls.FACEBOOK_USER_DETAILS_URL.replace("{fb-user-id}", userId).replace("{access-token}",accessToken);
                let fbResponse = this.getFacebookUserInfo(url);
                fbResponse.subscribe(data => {
                    this.fbUserLoginEvent.emit(data);
                })        
            } else {
                console.log('User login failed');
            }
        }, {scope: 'email'});
    }

    getFacebookUserInfo(url: string): Observable<any> {
		return this.http.get<any>(url);
    }
}
