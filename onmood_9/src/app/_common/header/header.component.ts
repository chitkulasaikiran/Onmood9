import { Component, OnInit } from '@angular/core';
import { ApiUrls } from '../../constants/ApiUrls';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoriesService } from '../../services/categories.service';
import { OnmoodCourseType } from 'src/app/model/onmood-course-type';
import { StorageService } from 'src/app/services/storage.service';
import { TOKEN } from 'src/app/constants/Constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  guestUserHeaders: Array<{
    title: string;
    link: string;
    isActive: boolean;
    isBtn: boolean;
  }>;

  loggedIn: boolean = false;
  showPopup: boolean = false;
  isNavOpened: boolean = false;
  userHeaders: Array<{
    title: string;
    course_id: number;
    link: string;
    isActive: boolean;
    isBtn: boolean;
    haveLink: boolean;
  }> = [];

  categoryTypes: Array<OnmoodCourseType> = [];
  constructor(
    private router: Router,
    private apiUrls: ApiUrls,
    private authenticationService: AuthenticationService,
    private categoriesService: CategoriesService,
    private storageService: StorageService
  ) {
    this.authenticationService.userEvent.subscribe((isloggedIn) => {
      this.updateHeader(isloggedIn);
    });

    this.authenticationService.userLogoutEvent.subscribe((isloggedOut) => {  
      // console.log("isloggedOut", isloggedOut);  
      // this.homeButtonClick();
      // window.location.reload();
      this.router.navigate(['home']);
    });


    this.guestUserHeaders = [
      {
        title: 'Home',
        link: '/home',
        isActive: true,
        isBtn: false,
      },
      {
        title: 'Blog',
        link: '/blog/category/all',
        isActive: false,
        isBtn: false,
      },
      {
        title: 'Premium',
        link: '/subscription',
        isActive: false,
        isBtn: false,
      },
      // { title: "SignIn", link: '/signin', isActive: false, isBtn: false },
      // { title: "Onmood9Blog", link: '/onmood9-blog', isActive: false, isBtn: false },
    ];
  }

  ngOnInit(): void {
    // console.log("ngOnInit is called")
    if (this.authenticationService.subsVar == undefined) {
      this.authenticationService.subsVar =
        this.authenticationService.deviceBackButtonEvent.subscribe(
          (courseId) => {
            this.makeActiveOnDeviceBackButton(courseId);
          }
        );
    }

    let token = this.storageService.getItem(TOKEN);
    if (token && token.length > 0) {
      this.loggedIn = true;
      this.getCategoryTypes();
    } else {
      this.loggedIn = false;
    }
  }

  openPopup() {
    this.showPopup = true;
  }

  closeNavigationPopup() {
    this.showPopup = false;
  }
  updateHeader(isloggedIn: boolean) {
    if (isloggedIn) {
      this.loggedIn = true;
      this.getCategoryTypes();
    } else {
      this.loggedIn = false;
    }
  }
  makeActive(navPageTitle: string, course_id: number) {
    let selectedLink = '';
    if (!this.userHeaders) {
      this.getCategoryTypes();
    }
    this.userHeaders.forEach((navLink) => {
      // console.log(navLink);
      if (navLink.title === navPageTitle) {
        navLink.isActive = true;
        selectedLink = navLink.link;
      } else {
        navLink.isActive = false;
      }
    });
    this.router.navigate([selectedLink], {
      state: {
        courseId: course_id,
      },
    });
  }

  makeActiveOnDeviceBackButton(courseId: number) {
    if (!this.userHeaders) {
      this.getCategoryTypes();
    }
    if (this.userHeaders) {
      this.userHeaders.forEach((navLink) => {
        if (Number(navLink.course_id) === courseId) {
          navLink.isActive = true;
        } else {
          navLink.isActive = false;
        }
      });
    }
  }

  makeGuestUserHeaderActive(navPageTitle: string) {
    let selectedLink = '';
    this.guestUserHeaders.forEach((navLink) => {
      if (navLink.title === navPageTitle) {
        navLink.isActive = true;
        selectedLink = navLink.link;
      } else {
        navLink.isActive = false;
      }
    });
    console.log(selectedLink);

    this.router.navigate([selectedLink]);
  }

  homeButtonClick() {
    if (!this.userHeaders) {
      this.getCategoryTypes();
    }
    if (this.loggedIn && this.userHeaders) {
      this.userHeaders.forEach((navLink) => {
        navLink.isActive = false;
      });
      this.router.navigate(['user-home']);
    } else {
      this.makeGuestUserHeaderActive('Home');
    }
  }

  logout() {
    this.toggleNav();
    this.makeActive('', 0);
    this.authenticationService.logout();
  }

  gotoMeditation() {
    this.router.navigate(['/meditation']);
  }

  toggleNav() {
    this.isNavOpened = !this.isNavOpened;
  }

  createLink() {
    this.router.navigate(['/reset-password'], {
      queryParams: {
        val: 'Query params for route 1',
      },
    });
  }

  getCategoryTypes() {
    this.categoriesService.getAllOnmoodCourseTypes().subscribe((data) => {
      this.categoryTypes = data;

      this.userHeaders = Array(data.length);
      data.forEach((element, index) => {
        this.userHeaders[index] = {
          title: element.course_name,
          course_id: element.id,
          link: 'onmood-course/' + element.id + '/courses',
          isActive: false,
          isBtn: false,
          haveLink: true,
        };
      });
    });
  }

  navigateTo(page: string) {
    if (this.isNavOpened) {
      this.toggleNav();
    }
    if (!this.userHeaders) {
      this.getCategoryTypes();
    }
    this.userHeaders.forEach((navLink) => {
      navLink.isActive = false;
    });
    this.guestUserHeaders.forEach((navLink) => {
      navLink.isActive = false;
    });
    this.router.navigate(['/' + page]);
  }
}
