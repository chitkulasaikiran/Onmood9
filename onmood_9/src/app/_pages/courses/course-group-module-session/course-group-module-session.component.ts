import { Component, OnInit,ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Aos from 'aos';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { CORP, CURRENT_SUBSCRIPTION, INDI, USER_TYPE } from 'src/app/constants/Constants';
import { CategoryGroupModule } from 'src/app/model/category-group-module';
import { CategoryGroupModuleSession } from 'src/app/model/category-group-module-session';
import { User } from 'src/app/model/user';
import { Video } from 'src/app/model/video';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-group-module-session',
  templateUrl: './course-group-module-session.component.html',
  styleUrls: ['./course-group-module-session.component.css']
})
export class CourseGroupModuleSessionComponent implements OnInit {

  deviceHeight = 0;
  deviceWidth = 0;
  image = "http://localhost/meditation_server/uploads/courses/images/meditation.jpg";
  moduleImage = "";
  
  isHidden = true;
  mentalHealthVideoUrl = "";
  moduleVideos: Array<Video> = [];
  videosPath = "";
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      800: {
        items: 4
      }
    },
    nav: false
  }


  courseId = 0;
  groupId = 0;
  moduleId = 0;
  selectedGroupModule!: CategoryGroupModule;
  isSelectedGroupModuleAvailable: boolean = false;
  moduleSessions: Array<CategoryGroupModuleSession> = [];
  user!: User;
  userPlayedSessionIds: Array<number> = [];
  @ViewChildren("audio") audios!: QueryList<ElementRef>;
  selectedSession = '';
  selectedSessionId = 0;
  isSessionPlayed: boolean = false;

  showAudioPopup = false;
  audioElement!: ElementRef ;
  totalDuration = "00:00";

  selectedIndex = -1;
  selectedAudioSource: string = "https://onmood9.com/assets/media/meditation.mp3";
  categoryId = 0;
  rVideos = 10;
  @ViewChild('video1') video1!: ElementRef;
  @ViewChild('video2') video2!: ElementRef;
	@ViewChild('videoDiv') videoDiv!: ElementRef;
	@ViewChild('closeVideoIcon') closeVideoIcon!: ElementRef;
  relavantVideoUrl: string = ""; 
  moduleImagePath = "";
  voiceOPtions = [];
  selectedVoiceOption = "M";
  isBothVoiceSelected = false;
  voiceOtionButtons: Array<{ title: string, isActive: boolean, canDisplay: boolean, isBtn: boolean, value: string }>;
  noSessionsText: string = "";
  haveActiveSubscription: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, 
    private userService: UserService, 
    private categoriesService: CategoriesService, 
    private authenticationService: AuthenticationService,
    private subscriptionService: SubscriptionService, 
    private storageService: StorageService) { 
    this.mentalHealthVideoUrl  = ApiUrls.ONMOOD9_IMAGES_PATH + "Corona_mental_health_pandemic_480.mp4#t=2";
    this.videosPath = ApiUrls.ONMOOD9_BG_MUSIC_PATH;
    this.moduleImagePath = ApiUrls.ONMOOD9_COURSE_IMAGES_PATH;
    this.voiceOtionButtons = [
      { title: "Male", isActive: true, canDisplay: false, isBtn: false, value: 'M' },
      { title: "Female", isActive: false, canDisplay: false, isBtn: false, value: 'F' },
      { title: "Music", isActive: false, canDisplay: false, isBtn: false, value: 'A' }
    ];
  }

  ngOnInit(): void {
    this.deviceWidth = window.screen.width;
    this.deviceHeight = window.screen.height;
    const currentUser = this.storageService.getCurrentUser(); 
    if(currentUser) {
      this.user = currentUser;
    }
   this.checkActiveSubscription();
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
        // this.getGroupsByCategory(this.courseId);
        let groupType = Number(params.get('group-id'));
        if(!isNaN(Number(groupType))) {
          let  groupNumberValue = Number(groupType);
          this.groupId = groupNumberValue;
          // this.getModulesByGroup(this.groupId);
          let moduleType = Number(params.get('module-id'));
          if(!isNaN(Number(moduleType))) {
            let  moduleNumberValue = Number(moduleType);
            this.moduleId = moduleNumberValue;
            this.getModuleInformation(this.moduleId);
            this.getSessionsByModule(this.moduleId);
            this.getModuleVideos();
          } else {

          }
        } else {

        }
      } else {
          console.log('Not a Number');
      }
    });
  }

  getSessionsByModule(id:number) {
    this.categoriesService.getSessionsByModuleId(id).subscribe((data:any) => {
      // this.categories = data;
      if(data['result'] === "success" && data['data'].length > 0) {
        this.noSessionsText = "";
        this.moduleSessions = data['data'];
        this.getUserPlayedSessions();

        // Need to remove this below function call after integration of user played sessions 
        // this.checkPlayedSessions();
      } else {
        this.noSessionsText = "No Sessions available right now under this module";
      }
    });
  }

  getUserPlayedSessions() {
    let userId = this.user.id;
    let uId = Number(userId);
    this.userService.getUserPlayedSessions(userId).subscribe(data => {
      const JSONData = JSON.parse(JSON.stringify(data));

      if(JSONData['status'] === true && JSONData['count'] > 0) {
        let playedSessionsArray = JSONData['data'];
        playedSessionsArray.forEach((session: CategoryGroupModuleSession) => {
          if(session.is_fully_listened === 'Y' && this.userPlayedSessionIds.indexOf(session.session_id) === -1) {
            this.userPlayedSessionIds.push(session.session_id); 
          }           
        });
      }

      this.checkPlayedSessions();
      
    });
  }

  checkPlayedSessions() {

    // C- Completed, L- Lock, P- Ready to Play
    let readyToPlayIndex = 0;
    this.moduleSessions.forEach((session, index) => {      
      if(this.userPlayedSessionIds.indexOf(session.id) >=0 ) {
        session.status = "C";
        session.canPlay = true;
        readyToPlayIndex = index + 1;
      } else {
        session.status = "P";
        session.canPlay = false;
      }


      
      // Make first session available to play      
      if(index === 0 && session.status != 'C') {
        session.status = "P";
        session.canPlay = true;
      }
      if(index === readyToPlayIndex) {
        session.status = "P";
        session.canPlay = true;
      }

      if(this.storageService.getItem(USER_TYPE) === CORP) {
        if(!this.haveActiveSubscription && session.is_paid === "paid") {
          session.status = "L";
          session.canPlay = false;
        }
      } else if(this.storageService.getItem(USER_TYPE) === INDI) {
        // Need to add logic to check active subscription later, for as of now only check for paid or free
        if(session.is_paid === "paid") {
          session.status = "L";
          session.canPlay = false;
        }
      }
    });     
  }  

  
  showPopupModal(index: number, sessionId: number, title: string, canPlay: boolean) {
    // alert(canPlay);
    this.selectedSessionId = sessionId;
    this.selectedSession = title;
    if(this.userPlayedSessionIds.indexOf(sessionId) >=0 ) {
      this.isSessionPlayed = true;
    }
    // this.fetchSessionFiles(sessionId);
    // return;
    if(canPlay) {
      this.selectedIndex = index;
      this.selectedSession = title;
      this.showAudioPopup = true;
      // No need below commented code
      /*let tempAudiosList = this.audios['_results'];
      this.audioElement = tempAudiosList[index].nativeElement; 
      document.body.style.overflow = "hidden";
      this.totalDuration = DateUtil.convertNumberToTime(this.audioElement['duration']); 
      */     
    }
  }


  fetchSessionFiles(index: number, sessionId: number, title: string, canPlay: boolean, status: string) {
    if(status === 'L') return;
    this.categoriesService.getSessionFilesBySessionId(sessionId, this.selectedVoiceOption).subscribe((response: any) => {
      if(response['count'] === 0) {
        alert("No files available")
      } else if (response['count'] > 0){
        const fileName = response['data'][0]['file_name'];
        this.selectedAudioSource = ApiUrls.ONMOOD9_SESSION_FILE_PATH + fileName;
        this.showPopupModal(index, sessionId, title, canPlay);
      } else {
        alert("Something went wrong, please try again after sometime");
      }
    });
  }

  handlePopup(value: boolean) {
    this.showAudioPopup = value;
    document.body.style.overflow = "";
  }
  

  getModuleInformation(moduleId: number) {
    this.categoriesService.getModuleDetails(moduleId).subscribe((response:any) => {
      if(response && response['data'] && response['data'].length > 0) {
        this.selectedGroupModule = response['data'][0]; 
        this.isSelectedGroupModuleAvailable = true;
        this.setVoiceOption();
        this.moduleImage =  ApiUrls.ONMOOD9_COURSE_IMAGES_PATH + this.selectedGroupModule.module_image;
        if(!this.haveActiveSubscription) {
          // this.router.navigate(["user-home"]);
          // return;
        }
      }
    });
  }

  isVoicesAvailable = false;
  setVoiceOption(){
    let voiceOption = this.selectedGroupModule.voice_over_option;
    this.isBothVoiceSelected = voiceOption === 'BMD' || voiceOption === 'BFD';
    if(this.isBothVoiceSelected) {
      this.voiceOtionButtons[0].canDisplay = true;
      this.voiceOtionButtons[1].canDisplay = true;
    } else if(voiceOption === 'OMD'){
      this.voiceOtionButtons[0].canDisplay = true;
    } else if(voiceOption === 'OFD'){
      this.voiceOtionButtons[1].canDisplay = true;
    } else if(voiceOption === 'M'){
      this.voiceOtionButtons[2].canDisplay = true;
    }


    if(voiceOption === 'OMD' || voiceOption === 'BMD') {
      this.selectedVoiceOption = 'M';
      this.changeVoiceOption('M');
    } else if(voiceOption === 'OFD' || voiceOption === 'BFD') {
      this.selectedVoiceOption = 'F';
      this.changeVoiceOption('F');
    } else if(voiceOption === 'M')   {
      this.selectedVoiceOption = 'A';
      this.changeVoiceOption('A');
    }
    this.isVoicesAvailable = true;
  }

  changeVoiceOption(value: string) {
   this.voiceOtionButtons.forEach(navLink => {
     if (navLink.value === value) {
       navLink.isActive = true;
       this.selectedVoiceOption = navLink.value;
     } else {
       navLink.isActive = false;
     }
   });
  }


  videoCarosalHeight = 0;
  videoCarosalItems = 0;
  getModuleVideos() {
    let moduleId = this.moduleId;
    this.categoriesService.getModuleVideos(moduleId).subscribe(data => { 
      const JSONData = JSON.parse(JSON.stringify(data));
      if(JSONData['result'] === 'success') {
        this.moduleVideos = JSONData['data'];
        // this.filterVideos();
        this.videoCarosalHeight = this.deviceWidth > this.deviceHeight ? 300 : 200;
        this.videoCarosalItems = this.deviceWidth > this.deviceHeight ? 3 : 2;

        this.moduleVideos.forEach(video => {
          if(video.video_thumb_image === "") {
            video.isVideoThumbAvailable = false;
          } else {
            video.isVideoThumbAvailable = true;
          }
        });
      }
    });
  }

  playRelavantVideo(src: string) {
    // alert(src);
    let video = this.video1.nativeElement;
    video.src = this.videosPath + src; // "https://onmood9.com/onmood9.com/assets/media/Corona_mental_health _pandemic_480.mp4"
    video.style.height = '95%';
    video.currentTime = 0;
    video.play();
    
		
		let closeVideoIcon = this.closeVideoIcon.nativeElement;
		closeVideoIcon.style.display = 'block';

		let videoDivObject = this.videoDiv.nativeElement;
		videoDivObject.style.height = '100%';

		document.body.style.overflow = "hidden";
  }

  closeRelavantVideo() {
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

  goBack() { 
    this.router.navigate(["/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+this.groupId+"/modules"]);
  }

  playVideo(video: Video) {
    this.relavantVideoUrl = video.audio_video_file;
  }

}
