import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef,
	ViewChild, } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { ApiService } from 'src/app/services/api-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { of, firstValueFrom  } from 'rxjs';
import AOS from 'aos';
import { Page } from 'src/app/model/page';
import { StorageService } from 'src/app/services/storage.service';
import { TOKEN } from 'src/app/constants/Constants';

@Component({
	selector: 'app-guest-home',
	templateUrl: './guest-home.component.html',
	styleUrls: ['./guest-home.component.css'],
})
export class GuestHomeComponent implements OnInit {
	signin: string = 'signin';
	signup: string = 'signup';
	thumbnailUrl: string;
	onmood9VideoUrl: string;
	isUserLoggedIn: boolean = false;
	courseList: any;
	pageMeta: any;
	constructor(private titleService: Title,
		private metaTagService: Meta,
		private router:Router,
		private httpClient: HttpClient,
		
		private apiService: ApiService,
		private authenticationService: AuthenticationService,
		private pageService: PageService,
		private storageService: StorageService,
		private userService: UserService) {
			this.authenticationService.userEvent.subscribe(isloggedIn => this.showHideSignin(isloggedIn));
			this.thumbnailUrl = ApiUrls.ONMOOD9_IMAGES_PATH + "Onmood9_Intro.jpg";
			this.onmood9VideoUrl = ApiUrls.ONMOOD9_IMAGES_PATH + "Mood_Meditation_Website_480.mp4";
		}

	ngOnInit(): void { 
		AOS.init();
		this.googleAuthSDK();
		this.getMetaInfo();
		this.authenticationService.makeHeaderActiveEvent(0);
		this.apiService.getOnmood9Moods().subscribe(data => {
			this.courseList = data['data'];
		});
		
		let token = this.storageService.getItem(TOKEN);
		
		if(token && token.length>0) {
			this.router.navigate(["user-home"]);
			// this.router.navigate(["home"]);
			return;
		}
	}
	

	async getMetaInfo() {
		const value = await firstValueFrom(this.pageService.getPageMetaByName('Guest_Home_Page'));
		// const value = await this.pageService.getPageMetaByName('Guest_Home_Page');
		// console.log(`async result: ${value}`);
		// console.log(value.hasOwnProperty('count'))
		// console.log(JSON.parse(JSON.stringify(value.valueOf())).pages)
		const response = JSON.parse(JSON.stringify(value.valueOf()));
		if(response['result'] === "success") {
			if(response['pages'].length > 0) {
				this.pageMeta = response['pages'][0];
				this.setMetaInfo(this.pageMeta);
			}
		}

	}
	setMetaInfo(pageMeta: Page) {
		this.titleService.setTitle(pageMeta.meta_title);
		this.metaTagService.updateTag({ name: 'description', content: pageMeta.meta_description });

		this.metaTagService.addTags([
			{ name: 'keywords', content: pageMeta.meta_keywords },
			{ name: 'robots', content: 'index, follow' },
			{ name: 'author', content: 'Onmood9' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'date', content: pageMeta.modified_on, scheme: 'YYYY-MM-DD' },
			{ charset: 'UTF-8' }
		]);
	}

	showHideSignin(isloggedIn: boolean) {
		if(isloggedIn) {
			this.isUserLoggedIn  = true;
		} else {
			this.isUserLoggedIn  = false;
		}
	}

	makeVideoFullScreen(videoObj:any) {
		if (videoObj.requestFullscreen) {
			videoObj.requestFullscreen();
			this.fixPortraitScreen();
		} else if (videoObj.msRequestFullscreen) {
		  videoObj.msRequestFullscreen();
		  this.fixPortraitScreen();
		}
		else if (videoObj.mozRequestFullScreen) {
		  videoObj.mozRequestFullScreen();
		  this.fixPortraitScreen();
		}
		else if (videoObj.webkitRequestFullscreen) {
		  videoObj.webkitRequestFullscreen();
		  this.fixPortraitScreen();
		} else {
		  console.log("Fullscreen API is not supported");
		}
	}

	fixPortraitScreen() {
		if(screen.orientation.type.startsWith("portrait")) {
		  // screen.orientation.lock("portrait-primary");
		}      
	}

	/*----------Login-----------*/ 
	showModal = false;
	show() {
		this.showModal = true;
	}
  
	hide() {
		this.showModal = false;
	}
 


	auth2: any;

	googleAuthSDK() {

		(<any>window)['googleSDKLoaded'] = () => {
		  (<any>window)['gapi'].load('auth2', () => {
			this.auth2 = (<any>window)['gapi'].auth2.init({
			  client_id: '2302985111021-pjfe2cnk0f6oohntnqhfr3sbpnuea73m.apps.googleusercontent.com',
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
	
	  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;


	  callLogin() {

		this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
		  (googleAuthUser: any) => {
	
			//Print profile details in the console logs
	
			let profile = googleAuthUser.getBasicProfile();
			// console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
			// console.log('ID: ' + profile.getId());
			// console.log('Name: ' + profile.getName());
			// console.log('Image URL: ' + profile.getImageUrl());
			// console.log('Email: ' + profile.getEmail());
	
		  }, (error: any) => {
			alert(JSON.stringify(error, undefined, 2));
		  });
	
	  }
}
