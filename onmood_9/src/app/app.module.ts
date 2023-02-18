import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './_common/header/header.component';
import { FooterComponent } from './_common/footer/footer.component';
import { ApiUrls } from './constants/ApiUrls';
import { AuthenticationService } from './services/authentication.service';
import { GuestHomeComponent } from './_pages/guest-home/guest-home.component';
import { ApiService } from './services/api-service';
import { GuestHomeModule } from './_pages/guest-home/guest-home.module';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordModule } from './_pages/forgot-password/forgot-password.module';
import { UserHomeModule } from './_pages/user-home/user-home.module';
import HttpAPIInterceptor from './services/httpAPIInterceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UserAccountComponent } from './_pages/user-account/user-account.component';
import { UserNotificationsComponent } from './_pages/user-notifications/user-notifications.component';
import { UserJourneyComponent } from './_pages/user-journey/user-journey.component';
import { MoodTrackerComponent } from './_pages/mood-tracker/mood-tracker/mood-tracker.component';
import { AddFeelingComponent } from './_pages/mood-tracker/add-feeling/add-feeling.component';
import { SigninComponent } from './_pages/signin/signin.component';
import { SigninModule } from './_pages/signin/signin.module';
import { TestFbLoginComponent } from './_pages/test-fb-login/test-fb-login.component';
import { StorageService } from './services/storage.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserAccountComponent,
    
    UserNotificationsComponent,
    UserJourneyComponent,
    TestFbLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ForgotPasswordModule,
    GuestHomeModule,
    UserHomeModule,
    SigninModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })   
  ],
  providers: [AuthenticationService, ApiUrls, ApiService, SocialAuthService,
    StorageService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(ApiUrls.FACEBOOK_APP_ID)
          }
        ],
      } as SocialAuthServiceConfig,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAPIInterceptor,
      multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }  
