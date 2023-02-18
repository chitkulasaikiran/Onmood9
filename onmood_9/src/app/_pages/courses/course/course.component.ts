import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AOS from 'aos';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { CORP, CURRENT_SUBSCRIPTION, INDI, USER_TYPE } from 'src/app/constants/Constants';
import { Category } from 'src/app/model/category';
import { CategoryGroup } from 'src/app/model/category-group';
import { CategoryGroupModule } from 'src/app/model/category-group-module';
import { OnmoodCourseType } from 'src/app/model/onmood-course-type';
import { Video } from 'src/app/model/video';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModuleService } from 'src/app/services/module.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubscriptionService } from 'src/app/services/subscription.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @ViewChild('video1')
  video1!: ElementRef;
  @ViewChild('closeVideoIcon')
  closeVideoIcon!: ElementRef;
  @ViewChild('videoDiv')
  videoDiv!: ElementRef;

  categories: Array<Category> = [];
  imagePath = "";
  image = "http://localhost/meditation_server/uploads/courses/images/meditation.jpg";
  onmood9VideoUrl = "";
  onmoodCourseId!: number;
  selectedCourseName = "Abcd";
  selectedCourse!: OnmoodCourseType;

  displayTabs: boolean = false;
  moduleImagePath = "";
  currentActiveModule! : CategoryGroupModule;


  customOptions: any = {
    loop: false,
    rewind: false,
    dotsEach: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: false,
    dots: true,
    lazyLoad:true,
    navSpeed: 700,
    navText: ['<', '>'],
    items: 5,
    nav: false
  }

  deviceWidth = 0;
  deviceHeight = 0;
  categoryId = 0;
  courseId = 0;
  isVideoAvailable: boolean = false;

  learnTabs = [{index: 0, name: "Courses", isActive: true},{index: 1, name: "Assessments", isActive: false}];
  haveActiveSubscription: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private categoriesService: CategoriesService, private authenticationService: AuthenticationService,  private subscriptionService: SubscriptionService, private storageService: StorageService, private moduleService: ModuleService) { 
    this.onmood9VideoUrl = ApiUrls.ONMOOD9_IMAGES_PATH + "Corona_mental_health_pandemic_480.mp4";
    this.moduleImagePath = ApiUrls.ONMOOD9_COURSE_IMAGES_PATH;
    this.currentActiveModule = new CategoryGroupModule;
  }

  ngOnInit(): void {
    this.checkActiveSubscription();
    this.deviceWidth = window.screen.width;
    this.deviceHeight = window.screen.height;
    AOS.init();
    this.imagePath = ApiUrls.COURSES_PATH;
    this.processRoute();
  }

  checkActiveSubscription() {
    if(this.storageService.getItem(USER_TYPE) === CORP) {
      this.subscriptionService.getCorpActiveSubscriptions().subscribe(data => {
        if (data['count'] > 0) {
          let currentSubscription = data['data'][0];
          this.storageService.storeItem(CURRENT_SUBSCRIPTION, JSON.stringify(currentSubscription));
          if (currentSubscription != null && 
            currentSubscription.is_cancelled === 'N' &&
            new Date(currentSubscription.start_date) <= new Date() && 
            new Date(currentSubscription.end_date) >= new Date()) {
              this.haveActiveSubscription = true;
          }
          //  else {
          //   this.router.navigate(["user-home"]);
          //   return;
          // }
        }
      });
    } else if(this.storageService.getItem(USER_TYPE) === INDI) {
      // Add logic to get subscription
    }
  }

  processRoute() {
    this.route.paramMap.subscribe(params => { 
      // let categoryId = params['params']['category-id'];
      this.categoryId = Number(params.get('category-id'));
      if(!isNaN(Number(this.categoryId))) {
        let  numberValue = Number(this.categoryId);
        this.authenticationService.makeHeaderActiveEvent(numberValue);
        this.onmoodCourseId = numberValue;
        this.getCourseInfo(this.onmoodCourseId);
        this.getCategoriesByCourseId(this.onmoodCourseId);
        // this.getGroupsWithModules(this.onmoodCourseId);
      } else {
          // console.log('Not a Number');
      }
    });
  }
  getCourseInfo(id:number){
    this.categoriesService.getOnmoodCourseInfo(id).subscribe(data => { 
      const JSONData = JSON.parse(JSON.stringify(data));
      this.selectedCourse = JSONData[0];
      this.selectedCourseName = this.selectedCourse.course_name; 
    });
  }
  getCategoriesByCourseId(onmoodCourseId:number) {
    this.categoriesService.getCategoriesByCourseId(onmoodCourseId).subscribe(data => { 
      const JSONData = JSON.parse(JSON.stringify(data));
      this.categories = JSONData['categories'];
      this.categories.forEach((category,index) => {

        if(category.category_type_id === "2" || category.category_type_id === "3") {
          this.displayTabs = true;
          category.name =  category.name.replace("Meditation","");
          if(index === 0) {
            category.isActive = true;
            this.courseId = category.id;
            this.getGroupsWithModules(category.id);
            this.getCategoryInfo(category.id);
          } else {
            category.isActive = false;
          }
        } else if(category.category_type_id === "1") {

          this.displayTabs = false;
          category.name =  category.name.replace("Assessments","Assess");
        } 
      });
    });
  }


  goBack() {
    // console.log("goBack is called");
  }

  switchTab(tabIndex:number) {
    this.categories.forEach((category,index) => {
      if(tabIndex === index) {
        category.isActive = true;
        this.courseId = category.id;
        this.getGroupsWithModules(category.id)
        this.getCategoryInfo(category.id);
      } else {
        category.isActive = false;
      }
    })
  }

  courseGroups: Array<CategoryGroup> = [];

  getGroupsWithModules(id:number) {
    this.categoriesService.getGroupsWithModulesInfo(id).subscribe(data => { 
      // this.categories = data;
      const JSONData = this.parseResponse(data);
      if(JSONData['result'] === "success" && JSONData['groups'].length > 0) {
        this.courseGroups = JSONData['groups'];
        this.courseGroups.forEach((group: CategoryGroup) => {
          group.height = this.deviceWidth > this.deviceHeight ? 250 : 140;;
          let copiedCustomOptions = Object.assign({}, this.customOptions);
          copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 4 : 2;

          group.customOptions = copiedCustomOptions;
          let object = {
            haveActiveSubscription: this.haveActiveSubscription,
            categoryId: this.onmoodCourseId,
            courseId: group.category_id,
            groupId: group.id
          };
          this.moduleService.prepareModuleLinks(group.modules, object);
        });
      }
    });
  }



  processModules(group: CategoryGroup) {

    group.modules.forEach((module: CategoryGroupModule) => {
      if(module.is_paid === "free") {
        // module.sessionsLink = "/onmood-course/"+module.categoryId+"/course/"+this.courseId+"/group/"+group.id+"/module/"+module.id+"/sessions";
        module.sessionsLink = "/onmood-course/" + this.onmoodCourseId + "/course/" + group.category_id + "/group/" + module.group_id + "/module/" + module.id + "/sessions";;
        module.sessionLinkAvailable = true;
      } else {
        module.sessionLinkAvailable = false;
      }
    });
  }

  prepareModuleLinksCourse(group: CategoryGroup) {
    let modules = group.modules;
    modules.forEach(module => {
      if(this.storageService.getItem(USER_TYPE) === CORP) {
        if(!this.haveActiveSubscription && module.is_paid === "paid") {
            module.sessionLinkAvailable = false;
            module.showLockIcon = true;
        } else {
          module.sessionsLink = "/onmood-course/"+this.onmoodCourseId+"/course/"+group.category_id+"/group/"+module.group_id+"/module/"+module.id+"/sessions";
            module.sessionLinkAvailable = true;
            module.showLockIcon = false;
        }
      } else if(this.storageService.getItem(USER_TYPE) === INDI) {
        if(module.is_paid === "free") {
          module.sessionsLink = "/onmood-course/"+this.onmoodCourseId+"/course/"+group.category_id+"/group/"+module.group_id+"/module/"+module.id+"/sessions";
          module.sessionLinkAvailable = true;
          module.showLockIcon = false;
        } else {
          module.sessionLinkAvailable = false;
          module.showLockIcon = true;
        }
      }
    });
  }




  getCategoryInfo(id: number) {
    this.categoriesService.getCategoryInfo(id).subscribe(data => {  
      const JSONData = this.parseResponse(data);
      this.selectedCourse = JSONData[0];
      this.selectedCourseName = JSONData[0].name;
      let videoId = JSONData[0].video_id;
      let activeModuleId = JSONData[0].active_module_id;
      if(videoId > 0) {
        this.isVideoAvailable = false;
        this.getCategoryVideoInfo(videoId);
      }
      if(activeModuleId > 0) {
        this.getActiveModule(activeModuleId);
      }
    });
  }

  categoryVideo: Video = new Video;
  videoThumbNail: string = "";
  isVideoThumbAvailable: boolean = false;

  categoryVideoUrl: string = "";
  getCategoryVideoInfo(videoId: number) {
    this.categoriesService.getVideoById(videoId).subscribe(response => { 
      if(response['count'] > 0) {
        this.isVideoAvailable = true;
        this.categoryVideo = response['videos'][0];
        // console.log(this.categoryVideo);
        this.isVideoThumbAvailable = this.categoryVideo.videoThumbImageName === null ? false : true;
        this.videoThumbNail = this.moduleImagePath + this.categoryVideo.videoThumbImageName;
        this.categoryVideoUrl = ApiUrls.ONMOOD9_BG_MUSIC_PATH + this.categoryVideo.audio_video_file; 
      }
    })
  }

  isCurrentActiveModule: boolean = false;
  getActiveModule(moduleId: number){
    this.categoriesService.getModuleDetails(moduleId).subscribe(response => { 

      if(response['count'] && response['count'] > 0) {
        this.currentActiveModule = response['data'][0];
        this.isCurrentActiveModule = true;
      } else {
        this.isCurrentActiveModule = false;
      }
    });
  }

  gotoActiveModule() {
     
    let url = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+this.currentActiveModule.group_id+"/module/"+this.currentActiveModule.id+"/sessions";
     
    this.router.navigate([url]);

  }


  isPlaying = false;
  playVideo() {
    let video = this.video1.nativeElement;
    if(this.isPlaying) {
      this.isPlaying = false;
      video.pause(); 
    } else {
      // this.isPlaying = true;
      video.src = this.categoryVideoUrl;
      video.play();
    }
		
		video.style.height = '100%';
		// video.play();
		
		let closeVideoIcon = this.closeVideoIcon.nativeElement;
		closeVideoIcon.style.display = 'block';

		let videoDivObject = this.videoDiv.nativeElement;
		videoDivObject.style.height = '100%';

		document.body.style.overflow = "hidden";
	}

  closeVideo() {
		
		let video = this.video1.nativeElement;
		video.style.height = '0';
		video.pause();
		video.currentTime = 0;
		video.load();
		
		let closeVideoIcon = this.closeVideoIcon.nativeElement;
		closeVideoIcon.style.display = 'none';

		let videoDivObject = this.videoDiv.nativeElement;
		videoDivObject.style.height = '0';

		document.body.style.overflow = "";
	}

  gotoSessions(event: any, groupIndex: number) {
    let group = this.courseGroups[groupIndex];
    if (event.name === "click") {
      let clickedModule = group.modules[event.cellIndex];
      let routerLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+group.id+"/module/"+clickedModule.id+"/sessions"; 
      this.router.navigate([routerLink]);
    }
  }


  gotoFeaturedModuleDetails(event: any, groupIndex: number, group: CategoryGroup) {
    if (event.name === "click") {
      // console.log(groupIndex, event.cellIndex);
      // console.log(this.courseGroups[groupIndex].modules[event.cellIndex].module_name)
      let clickedModule = this.courseGroups[groupIndex].modules[event.cellIndex];
      // console.log(clickedModule);
      let routerLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+group.id+"/module/"+clickedModule.id+"/sessions";
      // if(clickedModule.is_paid === 'free') this.router.navigate([routerLink]);

      if((this.storageService.getItem(USER_TYPE) === CORP) && (this.haveActiveSubscription || clickedModule.is_paid === "free")) {
        this.router.navigate([routerLink]);
      } else if(this.storageService.getItem(USER_TYPE) === INDI && clickedModule.is_paid === "free"){
        this.router.navigate([routerLink]);
      }
    }
  }


  learnContent: boolean = true;


  parseResponse(data:any){
    return JSON.parse(JSON.stringify(data));
  }

}
