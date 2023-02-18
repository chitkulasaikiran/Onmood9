import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef,
	ViewChild, Renderer2, Inject } from '@angular/core';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './mustMatch';
import { StorageService } from 'src/app/services/storage.service';
import { TOKEN } from 'src/app/constants/Constants';
import { DOCUMENT } from '@angular/common';
declare function greet(): void;
@Component({
	selector: 'app-guest-home',
	templateUrl: './guest-home.component.html',
	styleUrls: ['./guest-home.component.css'],
})
export class GuestHomeComponent implements OnInit {
	title = 'Codingvila Login With Google';
	auth2: any;
	@ViewChild('loginRef', { static: true }) loginElement!: ElementRef;


	signin: string = 'signin';
	signup: string = 'signup';
	thumbnailUrl: string;
	onmood9VideoUrl: string;
	isUserLoggedIn: boolean = false;
	courseList: any;
	pageMeta: any;
	helloMessage: string = "";
	constructor(private titleService: Title,
		private metaTagService: Meta,
		private router:Router,
		private httpClient: HttpClient,
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		private authenticationService: AuthenticationService,
		private pageService: PageService,
		private storageService: StorageService,
		private userService: UserService,private _renderer2: Renderer2,
		@Inject(DOCUMENT) private _document: Document) { 
			this.authenticationService.userEvent.subscribe(isloggedIn => this.showHideSignin(isloggedIn));
			this.thumbnailUrl = ApiUrls.ONMOOD9_IMAGES_PATH + "Onmood9_Intro.jpg";
			this.onmood9VideoUrl = ApiUrls.ONMOOD9_IMAGES_PATH + "Mood_Meditation_Website_480.mp4";
			this.authenticationService.userLogoutEvent.subscribe((isloggedOut) => this.reloadGoogleScript(isloggedOut));
	}


	navigateToSignin() {
		this.router.navigate(["signin"]);
	}

	reloadGoogleScript (isloggedOut: boolean) {
		let script = this._renderer2.createElement('script');
		script.src = "https://accounts.google.com/gsi/client";
		this._renderer2.appendChild(this._document.body, script);
	}
	ngOnInit() {
	  	AOS.init();
		
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

	showHideSignin(isloggedIn: boolean) {
		if(isloggedIn) {
			this.isUserLoggedIn  = true;
		} else {
			this.isUserLoggedIn  = false;
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
}
