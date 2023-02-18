
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';

import { CategoriesService } from "../../services/categories.service";
import { ApiUrls } from "../../constants/ApiUrls";
import { BlogService } from '../../services/blog.service';

import { Blog } from '../../model/blog';
import { MoodTrackerService } from "src/app/services/mood-tracker.service";
import { SessionsService } from "src/app/services/sessions.service";
import { ApiService } from "src/app/services/api-service";
import { BlogCategory } from "src/app/model/BlogCategory";
import { CategoryGroupModule } from "src/app/model/category-group-module";
import { Category } from "src/app/model/category";
import { UniqueModule } from "src/app/model/unique-module";
import { DateUtil } from "src/app/Utils/DateUtil";
import { StorageService } from "src/app/services/storage.service";
import { CORP, CURRENT_SUBSCRIPTION, CURRENT_USER, IS_LOGGEDIN, SESSION_EXPIRES_ON, TOKEN, UNAME, USER_TYPE } from "src/app/constants/Constants";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  deviceWidth!: number;
  deviceHeight!: number;
  cells: any;
  pleasentPercentage = 0;
  unpleasentPercentage = 0;
  @ViewChild('carouselUseCase') carouselUseCase: any;
  @ViewChild('carosalHeader') carosalHeader!: ElementRef;

  @ViewChild('courseContainer') courseContainer!: ElementRef;
  @ViewChild('cardTitle') cardTitle!: ElementRef;


  customOptions: any = {
    loop: false,
    rewind: false,
    dotsEach: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: false,
    dots: true,
    lazyLoad: true,
    navSpeed: 700,
    navText: ['<', '>'],
    items: 2,
    // responsive: {
    //   0: {
    //     items: 2
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 5
    //   }
    // },
    nav: false
  }
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent!: ElementRef<any>;

  learnCourses = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  categoryTypes = [];
  learnTopModules = [];
  meditateTopModules = [];
  meditateSeriesModules = [];
  meditateSinglesModules = [];
  moduleImagePath = "";

  meditateModules = { customOptions: { items: 0 }, height: 0, modules: new Array<UniqueModule> };
  meditateSeriesModules2 = { customOptions: { items: 0 }, height: 0, modules: new Array<UniqueModule> };
  meditateSinglesModules2 = { customOptions: { items: 0 }, height: 0, modules: new Array<UniqueModule> };
  relaxMusicModules = { customOptions: { items: 0 }, height: 0, modules: new Array<UniqueModule> };
  popularCourses = { customOptions: { items: 0 }, height: 0, categories: new Array<Category> };
  popularBlogs = { customOptions: { items: 0 }, height: 0, blogs: new Array<Blog> };

  featuredModules = { customOptions: { items: 0 }, height: 0, modules: new Array<UniqueModule> };


  blogList!: Blog[];
  blogCategoryList!: Array<BlogCategory>;
  public totalBlogCount = 0;
  blogImagesPath = "";

  meditaionSeriesImageWidth = 0;
  meditaionSeriesImageHeight = 0;
  meditaionSeriesCarosalHeight = 0;

  homePageDimensions = [];

  carouselWidth: number = 0;

  courseTabs = [
    { id: 1, name: "Learn", }
  ]

  	completedHours = '0.00';
	completedSessions = [];
  mySlideImages = [];
  mySlideOptions={items: 1, dots: true, nav: true};
  myCarouselOptions={items: 3, dots: true, nav: true};
  haveActiveSubscription: boolean = false;
  constructor(private router: Router, private apiService: ApiService, 
    private categoriesService: CategoriesService, 
    private blogService: BlogService,
    private moodTrackerService:MoodTrackerService, 
    private sessionService: SessionsService,
    private subscriptionService: SubscriptionService,
    private storageService: StorageService) {
    this.moduleImagePath = ApiUrls.ONMOOD9_COURSE_IMAGES_PATH;
    this.blogImagesPath = ApiUrls.BLOG_IMAGES_PATH;

    this.meditaionSeriesImageWidth = ApiUrls.MEDITATION_SERIES_HOME_PAGE_IMAGE_WIDTH;
    this.meditaionSeriesImageHeight = ApiUrls.MEDITATION_SERIES_HOME_PAGE_IMAGE_HEIGHT;
    this.meditaionSeriesCarosalHeight = ApiUrls.MEDITATION_SERIES_HOME_PAGE_CAROSAL_HEIGHT;
    this.cells = Array(20).fill(0, 20).map((x, i) => i);
  }


  
  ngOnInit(): void {    
    if(this.storageService.isSessionExpired()) { 
      this.storageService.clearStorage();
      this.router.navigate(['home']);
    }
 

    // if(this.storageService.getItem(USER_TYPE) === CORP) {
    //   this.subscriptionService.getCorpActiveSubscriptions().subscribe(data => {
    //     if (data['count'] > 0) {
    //       let currentSubscription = data['data'][0];
    //       this.storageService.storeItem(CURRENT_SUBSCRIPTION, JSON.stringify(currentSubscription));
    //       console.log(currentSubscription.start_date, currentSubscription.end_date);
    //       if (currentSubscription != null && 
    //         currentSubscription.is_cancelled === 'N' &&
    //         new Date(currentSubscription.start_date) <= new Date() && 
    //         new Date(currentSubscription.end_date) >= new Date()) {
    //           this.haveActiveSubscription = true;
    //       }
    //     }
    //   });
    // }
    const promise = this.storageService.isSubscriptionActive();
    promise.then(data => {
      if(data) {
        this.haveActiveSubscription = true;
      }
    });
    this.deviceWidth = window.screen.width;
    this.deviceHeight = window.screen.height;
    // this.getTopVisitModules("LEARN", 1);
    // this.getTopVisitModules("MEDITATE", 2);
    this.getPleasentUnpleasentData();
    this.loadBlogs();
    // this.getMeditateCourses();
    this.getFeaturedModules();
    // this.getMeditationSeriesModules2();
    // this.getMeditationSingleModules2();
    this.getMeditationModules();
    this.getRelaxMusicModules();
    this.getLearnCourses();
	  this.getDataIn30Days();
    // this.getHomePageDimensions();
  }

  getLearnCourses() {
    this.apiService.getLearnCourses().subscribe(response => {
      this.popularCourses.categories = response['categories'];
      // this.popularCourses.categories.sort((a, b) => a.categoryCount > b.categoryCount ? 1 : -1) ;
      // this.popularCourses.categories.sort((a, b) => a.categoryCount > b.categoryCount ? -1 : 1);
      let copiedCustomOptions = Object.assign({}, this.customOptions);
      copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 3 : 2;

      this.popularCourses.customOptions = copiedCustomOptions;
      this.popularCourses.height = this.deviceWidth > this.deviceHeight ? 310 : 140;
    });
  }


  getMeditationModules() {
    this.apiService.getMeditationModules().subscribe(response => {
      // this.meditateModules.modules = response['modules'];
      this.processModules(response['modules'], 'MEDITATE') 

      let copiedCustomOptions = Object.assign({}, this.customOptions);
      copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 5 : 2.5;

      this.meditateModules.customOptions = copiedCustomOptions;
      this.meditateModules.height = this.deviceWidth > this.deviceHeight ? 200 : 110;
    });
  }

  

  getFeaturedModules() {
    this.apiService.getFeaturedModules().subscribe(response => {
      this.processModules(response['modules'], 'FEATURED') 
      let copiedCustomOptions = Object.assign({}, this.customOptions);
      copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 5 : 2.5;

      this.featuredModules.customOptions = copiedCustomOptions;
      this.featuredModules.height = this.deviceWidth > this.deviceHeight ? 200 : 110;

    });
  }

  getRelaxMusicModules() {
    this.apiService.getRelaxMusicModules().subscribe(response => {
      // this.relaxMusicModules.modules = response['modules'];
      this.processModules(response['modules'], 'RELAX') 
      let copiedCustomOptions = Object.assign({}, this.customOptions);
      copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 5 : 2.5;

      this.relaxMusicModules.customOptions = copiedCustomOptions;
      this.relaxMusicModules.height = this.deviceWidth > this.deviceHeight ? 200 : 110;
    });
  }

  getSessionsLink(type:string, module:CategoryGroupModule) {
    let sessionsLink = "";
    if(type === 'MEDITATE') {
      sessionsLink = "/onmood-course/" + ApiUrls.MEDITATE_ID + "/course/" + module.categoryId + "/group/" + module.groupId + "/module/" + module.id + "/sessions";
    } else if(type === 'RELAX') {
      sessionsLink = "/onmood-course/" + ApiUrls.RELAX_ID + "/course/" + module.categoryId + "/group/" + module.groupId + "/module/" + module.id + "/sessions";
    } else if(type === 'FEATURED') {

      sessionsLink = "/onmood-course/" + module.courseTypeId + "/course/" + module.categoryId + "/group/" + module.groupId + "/module/" + module.id + "/sessions";
    }

    return sessionsLink;
  }

  processModules(modules:Array<CategoryGroupModule>, type: string) {
    let uniqueModules : UniqueModule[] = [];
    let tempModules:any = [];
    modules.forEach((module:CategoryGroupModule) => {
      if(tempModules.indexOf(module.id) === -1) {
        tempModules.push(module.id);
        let um: UniqueModule = {
          module : module,
          canAllow: this.haveActiveSubscription || module.is_paid === 'free',
          uniqueUsers: [module.user_id],
          uniqueUsersCount:  1
        };
        uniqueModules.push(um);
      } else {
        uniqueModules.forEach(uniqueModule => {
          if(uniqueModule.module.id === module.id) {
            if(uniqueModule.uniqueUsers.indexOf(module.user_id) === -1) {
              uniqueModule.uniqueUsers.push(module.user_id);
              uniqueModule.uniqueUsersCount += 1;
            }
          }
        });
      }
    });
    this.setModules(type, uniqueModules);
  }


  setModules(type: string, uniqueModules: UniqueModule[]) {
    switch (type) {
      case 'MEDITATE':
        this.meditateModules.modules = uniqueModules;
        this.meditateModules.modules.sort((a, b) => Number(b.uniqueUsersCount) - Number(a.uniqueUsersCount));
        break;
      case 'RELAX':
        this.relaxMusicModules.modules = uniqueModules;
        this.relaxMusicModules.modules.sort((a, b) => Number(b.uniqueUsersCount) - Number(a.uniqueUsersCount));
        break;
      case 'FEATURED':        
        this.featuredModules.modules = uniqueModules;
        this.featuredModules.modules.sort((a, b) => Number(b.uniqueUsersCount) - Number(a.uniqueUsersCount));
        break;
      default:
        break;
    }
  }


  loadBlogs() {
    this.blogService.getMostViewedActiveBlogs().subscribe(data => {
      let response = JSON.parse(JSON.stringify(data));
      this.blogCategoryList = response['blogCategories'];
      this.blogList = response['blogs'];
      this.totalBlogCount = this.blogList.length;

      this.popularBlogs.blogs = response['blogs'];

      let copiedCustomOptions = Object.assign({}, this.customOptions);
      copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 3 : 2;

      this.popularBlogs.customOptions = copiedCustomOptions;
      this.popularBlogs.height = this.deviceWidth > this.deviceHeight ? 300 : 160;
    })
  }

  showAlert() {
    alert("You dont have Active Subscritpion");
  }


  // Carosal events
  gotoFeaturedModuleDetails(event: any) {
    if (event.name === "click") {
      let clickedModule = this.featuredModules.modules[event.cellIndex];
      let routerLink = "/onmood-course/" + clickedModule.module.courseTypeId + "/course/" + clickedModule.module.categoryId + "/group/" + clickedModule.module.groupId + "/module/" + clickedModule.module.id + "/sessions";
      if(clickedModule.canAllow) this.router.navigate([routerLink]);
      else this.showAlert();
    }
  }
  gotoMeditateDetails(event: any) {
    if (event.name === "click") {
      let clickedModule = this.meditateModules.modules[event.cellIndex];
      let routerLink = "/onmood-course/" + ApiUrls.MEDITATE_ID + "/course/" + clickedModule.module.categoryId + "/group/" + clickedModule.module.groupId + "/module/" + clickedModule.module.id + "/sessions";
      if(clickedModule.canAllow) this.router.navigate([routerLink]);
      else this.showAlert();
    }
  }
  gotoRelaxDetails(event: any) {
    if (event.name === "click") {
      let clickedModule = this.relaxMusicModules.modules[event.cellIndex];
      let routerLink = "/onmood-course/" + ApiUrls.RELAX_ID + "/course/" + clickedModule.module.categoryId + "/group/" + clickedModule.module.groupId + "/module/" + clickedModule.module.id + "/sessions"
      if(clickedModule.canAllow) this.router.navigate([routerLink]);
      else this.showAlert();
    }
  }

  gotoPopulatLearnCourseDetails(event: any) {
    if (event.name === "click") {
      let clickedCategory = this.popularCourses.categories[event.cellIndex];
      let routerLink = "/onmood-course/" + ApiUrls.LEARN_ID + "/course/" + clickedCategory.id + "/groups";
      this.router.navigate([routerLink]);
    }
  }

  gotoPopularBlogDetails(event: any) {

    if (event.name === "click") {
      let clickedBlog = this.popularBlogs.blogs[event.cellIndex];
      let routerLink = "/blog/blog-detail/" + clickedBlog.id;
      this.router.navigate([routerLink]);
    }
  }

  getPleasentUnpleasentData() {
    let fromDate: any = new Date();
    let toDate = new Date();

    fromDate = fromDate.setDate(fromDate.getDate() - 30);
    const payLoad = {
      'userId':  this.storageService.getUserId(),
      'fromDate': new Date(fromDate),
      'toDate': toDate
    }
    this.moodTrackerService.getUserMoodsData(payLoad).subscribe(result => {
      let pleasentLength = 0;
      let unpleasentLength = 0;
      result.data.forEach((item:any)=>{
        if(item.mood_type === 'M1' || item.mood_type === 'M2' || item.mood_type === 'M3'|| item.mood_type === 'M4'){
          pleasentLength = pleasentLength + 1;
        }
        if(item.mood_type === 'M5' || item.mood_type === 'M6' || item.mood_type === 'M7'|| item.mood_type === 'M8'){
          unpleasentLength = unpleasentLength + 1;
        }
      });
      if(pleasentLength > 0) { this.pleasentPercentage = Number(((pleasentLength / result.data.length) * 100).toFixed(2)); }
      if(unpleasentLength > 0) { this.unpleasentPercentage = Number(((unpleasentLength / result.data.length) * 100).toFixed(2)); }
    })
    }

    navigateMoods(){
      this.router.navigate(['/moodtracker'])
    }
    navigatetimeTracker(){
      this.router.navigate(['/my-journey'])
    }



	getDataIn30Days() {
		let payLoad = this.createPayload();    
		this.sessionService.getUserPlayedSessionsWithDateRangeAllCategories(payLoad).subscribe((result: any) => {
			this.processJourneyData(result);
		})
	}

	processJourneyData(result:any) {
		const data = result.data;
		const sumall = data.map((item:any) => item.listened_time).reduce((prev:any, curr:any) => Number(prev) + Number(curr), 0);
		
		// this.completedHours = (sumall / (60 * 60)).toFixed(2);
		this.completedHours = DateUtil.secondsToHms(sumall);
		this.completedSessions = data.filter((item:any) => item.is_fully_listened === 'Y');
	}

	createPayload() {
		const today = new Date();
		let fromDate: any = new Date();
		let toDate = new Date();
		fromDate = fromDate.setDate(fromDate.getDate() - 30);    
		const payLoad: any = {
			"fromDate": new Date(fromDate),
			"toDate": toDate,
			"userId": this.storageService.getUserId(),
			"categoryId": 0
		}
		return payLoad;
	}

    

}