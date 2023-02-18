import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isOnline: boolean;
  modalVersion: boolean;
  modalPwaEvent: any;
  modalPwaPlatform: string|undefined;
  time = new Date();
  intervalId: any;

  public screenWidth: any;
  public screenHeight: any;
  public headerHeight = 65;
  public footerHeight = 161;
  public bodyHeight = 0;

  constructor(private platform: Platform, private swUpdate: SwUpdate, private _router: Router) {
    this.isOnline = false;
    this.modalVersion = false;
  }

  public ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this._router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    this.bodyHeight = this.screenHeight - (2*this.headerHeight) - this.footerHeight;

	// Using Basic Interval
    this.intervalId = setInterval(() => {
		  this.time = new Date();
	  }, 1000);


    this.updateOnlineStatus();

    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter(
          (evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
        ),
        map((evt: any) => {
          console.info(
            `currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`
          );
          this.modalVersion = true;
        })
      );
    }

	// console.log(this.platform);

	  // this.loadModalPwa(); 
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    // console.info(`isOnline=[${this.isOnline}]`);
  }

  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
  }

  public loadModalPwa2(): void {
	// console.log(this.platform);
  }

  private loadModalPwa(): void {
	if (this.platform.ANDROID) {
	    // alert(this.platform.ANDROID);

      window.addEventListener('beforeinstallprompt', (event: any) => {
		    // console.log(event)
		    // alert(this.platform.ANDROID);

        event.preventDefault();
        this.modalPwaEvent = event;

        this.modalPwaPlatform = 'ANDROID';
        window.addEventListener('touchmove', (event: any) => {
          // console.log(event);
          // alert(123);
          this.addToHomeScreen();
        });
      });
      
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
        window.addEventListener('beforeinstallprompt', (event: any) => {
          // console.log(event)
          // alert(this.platform.ANDROID);
  
          event.preventDefault();
          this.modalPwaEvent = event;
  
          window.addEventListener('touchmove', (event: any) => {
            // console.log(event);
            // alert(123);
            this.addToHomeScreen();
          });
        });
      }
    }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }
}
