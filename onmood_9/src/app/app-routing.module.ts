import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { ForgotPasswordComponent } from './_pages/forgot-password/forgot-password.component';
import { GuestHomeComponent } from './_pages/guest-home/guest-home.component';
import { PrivacyComponent } from './_pages/privacy/privacy.component';
import { SigninComponent } from './_pages/signin/signin.component';
import { SubscriptionComponent } from './_pages/subscription/subscription.component';
import { TermsComponent } from './_pages/terms/terms.component';
import { TestFbLoginComponent } from './_pages/test-fb-login/test-fb-login.component';
import { UserAccountComponent } from './_pages/user-account/user-account.component';
import { UserHomeComponent } from './_pages/user-home/user-home.component';
import { UserJourneyComponent } from './_pages/user-journey/user-journey.component';
import { UserNotificationsComponent } from './_pages/user-notifications/user-notifications.component';

const routes: Routes = [
  { path: '',   component: GuestHomeComponent, redirectTo: 'home' },
  { path: 'home',   component: GuestHomeComponent },
  { path: 'user-home',   component: UserHomeComponent,  canActivate: [AuthGuard] },
  { path: 'signin',   component: SigninComponent },
  { path: 'fb-login',   component: TestFbLoginComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'my-account', component: UserAccountComponent, canActivate: [AuthGuard]},
  { path: 'blog', loadChildren: () => import('./_pages/blogs/blogs.module').then(m => m.BlogsModule) },
  { path: 'onmood-course', loadChildren: () => import('./_pages/courses/courses.module').then(m => m.CoursesModule) },
  { path: 'my-notifications', component: UserNotificationsComponent, canActivate: [AuthGuard]},
  { path: 'my-journey', component: UserJourneyComponent,  canActivate: [AuthGuard]},
  { path: 'subscription', component: SubscriptionComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'terms', component: TermsComponent},
  
  { 
    path: 'assessments', 
    loadChildren: () => import('./_pages/assessments/assessments.module').then(m => m.AssessmentsModule),
    canActivate: [AuthGuard]
  },
  { path: 'moodtracker', 
    loadChildren:()=>import('./_pages/mood-tracker/mood-tracker.module').then(a => a.MoodTrackerModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
