
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Aos from 'aos';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { CORP, CURRENT_SUBSCRIPTION, INDI, USER_TYPE } from 'src/app/constants/Constants';
import { CategoryGroup } from 'src/app/model/category-group';
import { CategoryGroupModule } from 'src/app/model/category-group-module';
import { Course } from 'src/app/model/course';
import { Video } from 'src/app/model/video';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModuleService } from 'src/app/services/module.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-course-group',
  templateUrl: './course-group.component.html',
  styleUrls: ['./course-group.component.css']
})
export class CourseGroupComponent implements OnInit {

  image = "http://localhost/meditation_server/uploads/groups/more-services-1.jpg";
  onmood9VideoUrl = "";
  @ViewChild('closeVideoIcon') closeVideoIcon!: ElementRef;

  @ViewChild('video1') video1!: ElementRef;
  @ViewChild('videoDiv') videoDiv!: ElementRef;
  @ViewChild('carouselUseCase') carouselUseCase:any;


  nameCharLength = 20;
  descriptionCharLength = 110;
  currentPlayedTime = 0;
  totalPlayTime = 0;


  courseId = 0;
  selectedCourse!: Course;
  selectedCourseName = "";
  courseGroups: Array<CategoryGroup> = [];
  categoryVideo!: Video;
  categoryVideoUrl = "";
  groupImagePath = "";
  moduleImagePath = "";
  categoryId = 0;
  currentActiveModule! : CategoryGroupModule;
  isCurrentActiveModule: boolean = false;
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
  cells: any;
  haveActiveSubscription: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, 
    private categoriesService: CategoriesService, private userService: UserService, private subscriptionService: SubscriptionService, private storageService: StorageService, private moduleService: ModuleService) { 
    this.onmood9VideoUrl = ApiUrls.ONMOOD9_IMAGES_PATH + "Corona_mental_health_pandemic_480.mp4";
    this.groupImagePath = ApiUrls.ONMOOD9_COURSE_IMAGES_PATH;
    this.moduleImagePath = ApiUrls.ONMOOD9_COURSE_IMAGES_PATH;
    this.cells = Array(20).fill(0, 20).map((x,i)=>i);

  }

  ngOnInit(): void {
    this.checkActiveSubscription();
    this.deviceWidth = window.screen.width;
    this.deviceHeight = window.screen.height;
    Aos.init();
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
      
      this.categoryId = Number(params.get('category-id'));
      let courseType = Number(params.get('course-id')); 
      if(!isNaN(Number(courseType))) {
        let  numberValue = Number(courseType);
        this.courseId = numberValue;
        this.getCategoryInfo(this.courseId);
        // this.getGroupsByCategory(this.courseId);
        this.getGroupsWithModules(this.courseId);
      } else {
          console.log('Not a Number');
      }
    });
  }

  getCategoryInfo(id:number) {
    this.categoriesService.getCategoryInfo(id).subscribe((data:any) => { 
      this.selectedCourse = data[0];
      this.selectedCourseName = data[0].name;
      let videoId = data[0].video_id;
      let activeModuleId = data[0].active_module_id;
      if(videoId > 0) {
        this.getCategoryVideoInfo(videoId);
      }
      if(activeModuleId > 0) {
        this.getActiveModule(activeModuleId);
      }
    });
  }

  getActiveModule(moduleId:number){
    this.categoriesService.getModuleDetails(moduleId).subscribe((response:any) => { 
      if(response['count'] && response['count'] > 0) {
        this.currentActiveModule = response['data'][0];
        this.isCurrentActiveModule = true;
      } else {
        this.isCurrentActiveModule = false;
      }
    });
  }

  isVideoAvailable: boolean = false;
  isVideoThumbAvailable: boolean = false;
  videoThumbNail: string = "";
  getCategoryVideoInfo(videoId:number) {
    this.categoriesService.getVideoById(videoId).subscribe(response => { 
      if(response['count'] > 0) {
        this.isVideoAvailable = true;
        this.categoryVideo = response['videos'][0];
        this.isVideoThumbAvailable = this.categoryVideo.videoThumbImageName === null ? false : true;
        this.videoThumbNail = this.moduleImagePath + this.categoryVideo.videoThumbImageName;
        this.categoryVideoUrl = ApiUrls.ONMOOD9_BG_MUSIC_PATH + this.categoryVideo.audio_video_file; 
      }
    })
  }


  getGroupsByCategory(id:number) {
    // public static GET_CATEGORY_GROUPS_BY_CATEGORY_URL  = ApiUrls.BASE_URL + "CategoryGroup/getGroupsByCategoryId/{id}";
    this.categoriesService.getGroupsByCategoryId(id).subscribe(data => { 
      // this.categories = data;
      const JSONData = JSON.parse(JSON.stringify(data));
      if(JSONData['result'] === "success" && JSONData['data'].length > 0) {
        // this.courseGroups = data['data'];
      }
    });
  }

  getGroupsWithModules(id:number) {
    this.categoriesService.getGroupsWithModulesInfo(id).subscribe(data => { 
      // this.categories = data;
      const JSONData = JSON.parse(JSON.stringify(data));
      if(JSONData['result'] === "success" && JSONData['groups'].length > 0) {
        this.courseGroups = JSONData['groups'];
        this.courseGroups.forEach(group => {
          group.height = this.deviceWidth > this.deviceHeight ? 250 : 160;;
          let copiedCustomOptions = Object.assign({}, this.customOptions);
          copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 4 : 2;

          group.customOptions = copiedCustomOptions;
          let object = {
            haveActiveSubscription: this.haveActiveSubscription,
            categoryId: this.categoryId,
            courseId: this.courseId,
            groupId: group.id
          };
          this.moduleService.prepareModuleLinks(group.modules, object);
        });
      }
    });
  }

  prepareModuleLinksOld(group: CategoryGroup) {
    let modules = group.modules;
    modules.forEach(module => {
      if(module.is_paid === "free") {
        module.sessionsLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+group.id+"/module/"+module.id+"/sessions";
        module.sessionLinkAvailable = true;
      } else {
        module.sessionLinkAvailable = false;
      }
    });
  }

  prepareModuleLinksGroup(group: CategoryGroup) {
    let modules = group.modules;
    modules.forEach(module => {
      if(this.storageService.getItem(USER_TYPE) === CORP) {
        if(!this.haveActiveSubscription && module.is_paid === "paid") {
            module.sessionLinkAvailable = false;
            module.showLockIcon = true;
        } else {
          module.sessionsLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+group.id+"/module/"+module.id+"/sessions";
            module.sessionLinkAvailable = true;
            module.showLockIcon = false;
        }
      } else if(this.storageService.getItem(USER_TYPE) === INDI) {
        if(module.is_paid === "free") {
          module.sessionsLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+group.id+"/module/"+module.id+"/sessions";
          module.sessionLinkAvailable = true;
          module.showLockIcon = false;
        } else {
          module.sessionLinkAvailable = false;
          module.showLockIcon = true;
        }
      }
    });
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
    this.saveUserSessionPlay();
	}

  goBack() { 
    this.router.navigate(["onmood-course/"+this.categoryId+"/courses"]);
  }

  gotoActiveModule() { 
    
    let url = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+this.currentActiveModule.group_id+"/module/"+this.currentActiveModule.id+"/sessions";
     
    this.router.navigate([url]);

  }


  handleCarouselUseCaseEvents(event:any) {
    // console.log(event);
  }
  onTimeUpdate(event:any){
    this.currentPlayedTime = event.target.currentTime;
    this.totalPlayTime = event.target.duration;
  }

  
  saveUserSessionPlay() {
    const user = this.storageService.getCurrentUser();
    let payload = {
      "userId": user.id,
      "sessionId": this.courseId,
      "listened_time": this.currentPlayedTime,
      "is_fully_listened": this.currentPlayedTime === this.totalPlayTime ? 'Y' : 'N'
    }
    this.userService.saveUserPlayedSession(payload).subscribe((response:any) => { 
      if(response['status'] === true) {
      }
    })
  }

  gotoFeaturedModuleDetails(event: any, groupIndex: number, group: CategoryGroup) {
    if (event.name === "click") {
      console.log(groupIndex, event.cellIndex);
      console.log(this.courseGroups[groupIndex].modules[event.cellIndex].module_name)
      let clickedModule = this.courseGroups[groupIndex].modules[event.cellIndex];
      console.log(clickedModule)
      let routerLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+group.id+"/module/"+clickedModule.id+"/sessions";

      // if(clickedModule.is_paid === 'free') this.router.navigate([routerLink]);

      if((this.storageService.getItem(USER_TYPE) === CORP) && (this.haveActiveSubscription || clickedModule.is_paid === "free")) {
        this.router.navigate([routerLink]);
      } else if(this.storageService.getItem(USER_TYPE) === INDI && clickedModule.is_paid === "free"){
        this.router.navigate([routerLink]);
      }
    }
  }

}
