import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { CORP, CURRENT_SUBSCRIPTION, IS_LOGGEDIN, USER_TYPE } from 'src/app/constants/Constants';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from './mustMatch';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isSignupActive: boolean = true;
  submitted = false;
	returnUrl!: string;
	isErrorOccured: boolean = false;
  errorMessage: string = "";
  loginForm: FormGroup;
	signupForm!: FormGroup;
  loading = false; 
  auth2: any;
	@ViewChild('loginRef', { static: true }) loginRef!: ElementRef;
	@ViewChild('loginRef2', { static: true }) loginRef2!: ElementRef;

  constructor(private formBuilder: FormBuilder,private router: Router,
		private userService: UserService,
    	private authenticationService: AuthenticationService, 
		private storageService: StorageService,
		private subscriptionService: SubscriptionService) { 
    	this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.signupForm = this.formBuilder.group({
			fName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required]
		}, {
			validator: MustMatch('password', 'confirmPassword')
		});
  }

  ngOnInit(): void {
    this.googleAuthSDK();
  }

  get f() {
		return this.loginForm.controls;
	}

	showSigninFormError() {
		if (this.f['username'].errors && this.f['username'].errors['required']) {
			this.errorMessage = "Email is required";
			this.isErrorOccured = true;
		} else if (this.f['password'].errors && this.f['password'].errors['required']) {
			this.errorMessage = "Password is required";
			this.isErrorOccured = true;
		}
	}
  processPostLogin(data:any, isSocialLogin: boolean) {
		if (data['token'] && data['token'] != null) {
			
			const user  = isSocialLogin ? data['user'][0] : data['user'];
			const name  = isSocialLogin ? data['user'][0]['name'] : data['name'];

			let obj = {
				user: JSON.stringify(user), 
				name: name, 
				token: data["token"], 
				user_type: data["user_type"],
				cunique_id: data['cunique_id']
			}

			this.loading = false;
			this.errorMessage = "";
			this.isErrorOccured = false;
			this.authenticationService.storeUserInLocalStorage2(obj);
			if(this.storageService.getItem(USER_TYPE) === CORP) {
				this.getUserActiveSubscriptions();
			} else {
				this.router.navigate(["user-home"]);
			}
			
		} else {
			this.errorMessage = data['message'];
			this.isErrorOccured = true;
			this.loading = false;
			this.storageService.storeItem(IS_LOGGEDIN, "false");
			
		}
	}

	getUserActiveSubscriptions() {
		this.subscriptionService.getCorpActiveSubscriptions().subscribe(data => {
			if (data['count'] > 0) {
				let currentSubscription = data['data'][0];
				this.storageService.storeItem(CURRENT_SUBSCRIPTION, JSON.stringify(currentSubscription)); 

			}
			this.router.navigate(["user-home"]);
		});
	}

	get sf() {
		return this.signupForm.controls;
	}
	showSignupFormError() {
		let isInvalid = false;
		if (this.sf['fName'].errors && this.sf['fName'].errors['required']) {
			this.errorMessage = "Name is required";
			this.isErrorOccured = true;
			isInvalid = true;
		} else if (this.sf['email'].errors && this.sf['email'].errors['required']) {
			this.errorMessage = "Email is required";
			this.isErrorOccured = true;
			isInvalid = true;
		} else if (this.sf['password'].errors && this.sf['password'].errors['required']) {
			this.errorMessage = "Password is required";
			this.isErrorOccured = true;
			isInvalid = true;
		} else if (this.sf['confirmPassword'].errors && this.sf['confirmPassword'].errors['required']) {
			this.errorMessage = "Confirm Password is required";
			this.isErrorOccured = true;
			isInvalid = true;
		} else if (this.sf['password'].value.length < 5) {
			this.errorMessage = "Password should be minimum 6 Characters";
			this.isErrorOccured = true;
			isInvalid = true;
		} else if (this.sf['confirmPassword'].errors && this.sf['confirmPassword'].errors['mustMatch']) {
			this.errorMessage = "Passwords must match";
			this.isErrorOccured = true;
			isInvalid = true;
		} 

		return isInvalid;
	}

	/** 
	 *doOnmoodSignup
	 */
	 signup() {
		this.submitted = true;
		this.isErrorOccured = false;
		this.errorMessage = "";
		if (this.signupForm.invalid) {
			this.showSignupFormError();
			return;
		}
		// this.loading = true;
		let formData: any = {
			email: this.sf['email'].value,
			pwd: this.sf['password'].value,
			fName: this.sf['fName'].value
		}
		// this.loading = true;
		this.userService.register(formData).subscribe((data) => { 
			if (data['status']) {
				alert('Registration is success, please check your email inbox and activate your account!!');
				// this.router.navigate(['/signin']);
				this.loading = false;
				// this.switchToSignup();
			} else {
				this.loading = false;
				// alert(data['error'])
				this.isErrorOccured = true;
				this.errorMessage = data['error'];
			}

		}, (error) => {
			this.loading = false;
		});
	}
  doOnmoodLogin() {
		this.submitted = true;
		this.errorMessage = "";
		this.isErrorOccured = false;
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			this.showSigninFormError();
			return;
		}

		this.loading = true;
		this.authenticationService.login(this.f['username'].value, this.f['password'].value)
			.subscribe(
				data => {
					let isSocialLogin = false;
					this.processPostLogin(data, isSocialLogin);
				},
				error => {
					this.loading = false;
					this.storageService.storeItem(IS_LOGGEDIN, "false");
				});

	}

  googleAuthSDK() {
	
		(<any>window)['googleSDKLoaded'] = () => {
		  (<any>window)['gapi'].load('auth2', () => {
			this.auth2 = (<any>window)['gapi'].auth2.init({
			  client_id: '302985111021-pjfe2cnk0f6oohntnqhfr3sbpnuea73m.apps.googleusercontent.com',
			  plugin_name:'login',
			  cookiepolicy: 'single_host_origin',
			  scope: 'profile email'
			}); 
			
			this.callLogin();
		  });
		}
	
		(function (d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) { return; }
		  js = d.createElement('script');
		  js.id = id;
		  js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
		  fjs?.parentNode?.insertBefore(js, fjs);
		}(document, 'script', 'google-jssdk'));
  }
  callLogin() {

      this.auth2.attachClickHandler(this.loginRef.nativeElement, {},
        (googleAuthUser: any) => {
    
        //Print profile details in the console logs
		this.handleResponse(googleAuthUser);       
    
        }, (error: any) => {
        	// alert(JSON.stringify(error, undefined, 2));
        });

		this.auth2.attachClickHandler(this.loginRef2.nativeElement, {},
			(googleAuthUser: any) => {
		
			//Print profile details in the console logs        
			this.handleResponse(googleAuthUser);       
		
			}, (error: any) => {
				alert(JSON.stringify(error, undefined, 2));
			});
    
    }
    saveSocialUser(socialId:string, socialType: string, fname: string, lname: string, email: string) {
      this.userService.saveSocialMediaUser(socialId, socialType, fname, lname, email).subscribe((data) => {
        this.processPostLogin(data, true);
      }, (error: any) => {
        console.log(JSON.stringify(error));
      })
    }

	handleResponse(googleAuthUser: any) {
		let profile = googleAuthUser.getBasicProfile();
        // console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
  
        this.saveSocialUser(profile.getId(), "google", profile.getName(), profile.getName(), profile.getEmail());
	}



	/**
	  Do facebok login
	*/
	doFacebookLogin() {
		this.authenticationService.doFacebookLogin();
	}

}
