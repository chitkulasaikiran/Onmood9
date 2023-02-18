import {
	Component,
	OnInit,
	ElementRef,
	ViewChild,
	Injector,
	Inject,
	HostListener,
	Input
} from '@angular/core';
import {
	Router,
	ActivatedRoute
} from '@angular/router';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import {
	first
} from 'rxjs/operators';
import {
	UserService
} from "../../services/user.service";
import {
	AuthenticationService
} from "../../services/authentication.service";
import { SocialLoginModule, SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {
	MustMatch
} from "./mustMatch";
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { StorageService } from 'src/app/services/storage.service';
import { CORP, CURRENT_SUBSCRIPTION, IS_LOGGEDIN, USER_TYPE } from 'src/app/constants/Constants';
import { SubscriptionService } from 'src/app/services/subscription.service';

declare function greet(): void;
declare global {
	interface Window { handleCredentialResponse: any; }
  }

window.handleCredentialResponse = (response: any) => {
	
	var event = new CustomEvent("googleLoginSuccess", 
		{
			detail: response,
			bubbles: true,
			cancelable: true
		}
	);
	gotGoogleUser = true;
	window.dispatchEvent(event);
}
var gotGoogleUser = false;

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	@Input() type: string = "";

	popupType: string  = "signin";
	loginForm: FormGroup;
	signupForm!: FormGroup;

	loading = false;
	submitted = false;
	returnUrl!: string;
	isErrorOccured: boolean = false;
	errorMessage: string = "";
	googleBtnText: string = "";
	@ViewChild('closeIcon') private closeIcon!: ElementRef;
	isSigninForm: boolean = true;
	tNcAccepted: boolean = false;
	auth2: any;
	@ViewChild('loginRef', { static: true }) loginRef!: ElementRef;

	onmood9TermsUrl = "";
	onmood9PrivacyUrl = "";
	constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authService: SocialAuthService,
		private userService: UserService,
		private subscriptionService: SubscriptionService,
		private authenticationService: AuthenticationService,
		private storageService: StorageService) {
			this.onmood9PrivacyUrl = ApiUrls.UI_WEBSITE_URL + "privacy";
			this.onmood9TermsUrl = ApiUrls.UI_WEBSITE_URL + "terms";
		this.authenticationService.fbUserLoginEvent.subscribe(userObject => this.postFbLogin(userObject));
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ngOnInit(): void {		
		if(this.type === 'signin') {
			this.popupType = 'signin';
			this.googleBtnText = "Sign in With Google";
			this.isSigninForm = true;
		} else if(this.type === 'signup') {
			this.popupType = 'signup';
			this.googleBtnText = "Sign up With Google";
			this.isSigninForm = false;
			this.signupForm = this.formBuilder.group({
				fName: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', Validators.required]
			}, {
				validator: MustMatch('password', 'confirmPassword')
			});
		}
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	switchPopup(type:string) {
		if(type === 'signin') {
			this.popupType = 'signin';
			this.googleBtnText = "Sign in With Google";
			this.isSigninForm = true;
		} else if(type === 'signup') {
			this.popupType = 'signup';
			this.googleBtnText = "Sign up With Google";
			this.isSigninForm = false;
			this.signupForm = this.formBuilder.group({
				fName: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', Validators.required]
			}, {
				validator: MustMatch('password', 'confirmPassword')
			});
		}
	}

	

	@HostListener('window:googleLoginSuccess', ['$event']) 
	onPaymentSuccess(event: any): void {
		if(gotGoogleUser) {
			gotGoogleUser = false;
			var base64Url = event.detail.credential.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));
			const parsedJson = JSON.parse(jsonPayload);
			const googleUser = {
				id: parsedJson.sub,
				name: parsedJson.name,
				email: parsedJson.email
			};
			this.saveSocialUser(googleUser.id, "google", googleUser.name, googleUser.name, googleUser.email);
		}
		
	}

	resetForm() {
		this.isErrorOccured = false;
		this.errorMessage = "";
		this.isSigninForm = true;
		this.tNcAccepted = false;
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

	switchToSignup() {
		this.isSigninForm = !this.isSigninForm;
		this.isErrorOccured = false;
		this.errorMessage = "";
		if (!this.isSigninForm) {
			this.popupType = 'signin';
			this.signupForm = this.formBuilder.group({
				fName: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', Validators.required]
			}, {
				validator: MustMatch('password', 'confirmPassword')
			});
		}
	}

	

	// convenience getter for easy access to form fields
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

	processPostLogin(data:any, isSocialLogin: boolean) {
		if (data['token'] && data['token'] != null) {
			
			const user  = isSocialLogin ? data['user'] : data['user'];
			const name  = isSocialLogin ? data['user']['name'] : data['name'];

			let obj = {
				user: JSON.stringify(user), 
				name: name, 
				token: data["token"], 
				user_type: data["user_type"],
				cunique_id: data['cunique_id'],
				haveSubscription: data['subscriptions'].length > 0 ? true : false,
				subscription: data['subscriptions'].length > 0 ? data['subscriptions'][0] : {}
			}

			this.loading = false;
			this.errorMessage = "";
			this.isErrorOccured = false;
			this.closeIcon.nativeElement.click();
			this.authenticationService.storeUserInLocalStorage2(obj);
			this.router.navigate(["user-home"]);
		} else {
			this.errorMessage = data['message'];
			this.isErrorOccured = true;
			this.loading = false;
			this.storageService.storeItem(IS_LOGGEDIN, "false");
		}
	}

	/**
	  Do facebok login
	*/
	doFacebookLogin() {
		this.authenticationService.doFacebookLogin();
	}

	postFbLogin(fbUser:any) {
		// console.log(fbUser)
		this.saveSocialUser(fbUser["id"], "facebook", fbUser["name"], fbUser["name"], fbUser["email"]);
	}

	doGoogleLogin() {
		
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleUser => {
			this.saveSocialUser(googleUser.id, "google", googleUser.name, googleUser.name, googleUser.email);
		}).catch(error => {
			console.log(error);
		});
	}

	saveSocialUser(socialId:string, socialType: string, fname: string, lname: string, email: string) {
		this.userService.saveSocialMediaUser(socialId, socialType, fname, lname, email).subscribe((data) => {
			this.processPostLogin(data, true);
		}, (error) => {
			console.log(JSON.stringify(error));
		})
	}


	// 
	onChange(isChecked: boolean) {
		if (isChecked) {
			this.tNcAccepted = true;
		} else {
			this.tNcAccepted = false;
		}
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
		// console.log(formData);
		this.userService.register(formData).subscribe((data) => {

			if (data['status']) {
				alert('Registration is success, please check your email inbox and activate your account!!');
				// this.router.navigate(['/signin']);
				this.loading = false;
				// this.switchToSignup();
				this.closeIcon.nativeElement.click();
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
		} else if (this.sf['confirmPassword'].errors && this.sf['confirmPassword'].errors['mustMatch']) {
			this.errorMessage = "Passwords must match";
			this.isErrorOccured = true;
			isInvalid = true;
		}

		return isInvalid;
	}

	switchToForgotPassword() {
		this.closeIcon.nativeElement.click();
		this.router.navigate(['/forgot-password']);
	}


	




	//   To be removed google login old approach
	/*callLogin() {

		this.auth2.attachClickHandler(this.loginRef.nativeElement, {},
		  (googleAuthUser: any) => {
			alert(123)
	
			//Print profile details in the console logs
	
			let profile = googleAuthUser.getBasicProfile();
			// console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
			// console.log('ID: ' + profile.getId());
			// console.log('Name: ' + profile.getName());
			// console.log('Image URL: ' + profile.getImageUrl());
			// console.log('Email: ' + profile.getEmail());

			this.saveSocialUser(profile.getId(), "google", profile.getName(), profile.getName(), profile.getEmail());
	
		  }, (error: any) => {
			// alert(JSON.stringify(error, undefined, 2));
		  });
	
	  }
	 
	  
	  googleAuthSDK() {
		console.log("googleAuthSDK is called");
		
		(<any>window)['googleSDKLoaded'] = () => {
		  (<any>window)['gapi'].load('auth2', () => {
			this.auth2 = (<any>window)['gapi'].auth2.init({
			  client_id: '302985111021-pjfe2cnk0f6oohntnqhfr3sbpnuea73m.apps.googleusercontent.com',
			  plugin_name:'login',
			  cookiepolicy: 'single_host_origin',
			  scope: 'profile email'
			});
			// console.log(this.auth2);
			
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
	  */
}