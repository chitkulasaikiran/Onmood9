import { Component, OnInit } from '@angular/core';
import { ApiUrls } from 'src/app/constants/ApiUrls';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


declare var FB: any;

@Component({
	selector: 'app-test-fb-login',
	templateUrl: './test-fb-login.component.html',
	styleUrls: ['./test-fb-login.component.css']
})
export class TestFbLoginComponent implements OnInit {
	isFbUser: boolean = false;
	constructor(private http: HttpClient  ) { }

	ngOnInit(): void {
		this.fbSetup();
		this.getFBLoginStatus();

	}

	/**Facebook login */
	fbSetup() {
		(window as any).fbAsyncInit = function () {
			FB.init({
				appId: ApiUrls.FACEBOOK_APP_ID,
				cookie: true,
				xfbml: true,
				version: 'v3.1'
			});

			FB.AppEvents.logPageView();
			

		};
	}

	getFBLoginStatus() {
		FB.getLoginStatus(function(response: any) { 
			
			// statusChangeCallback(response);
		});
	}

	doFBLogin() {
		FB.login((response: any) => {
			// handle the response 
			if (response.status === "connected") {
                //login success
                //login success code here
                //redirect to home page
                let accessToken = response.authResponse.accessToken;
                let userId = response.authResponse.userID;
                let url = ApiUrls.FACEBOOK_USER_DETAILS_URL.replace("{fb-user-id}", userId).replace("{access-token}",accessToken);
                let fbResponse = this.getFacebookUserInfo(url);
                fbResponse.subscribe(data => { 
					this.isFbUser = true;
					
                })        
            } else {
                console.log('User login failed');
            }
			
		  }, {scope: 'public_profile, email'});
	}

	getFacebookUserInfo(url: string): Observable<any> {
		return this.http.get<any>(url);
    }

	doFBLogout() {
		FB.logout((response: any) => {
			// Person is now logged out
			this.isFbUser = false;

		});
	}
	
}
