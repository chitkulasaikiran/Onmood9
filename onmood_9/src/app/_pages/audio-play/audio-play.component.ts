import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { MusicSingleService } from "../../services/music-single.service";
import { CategoriesService } from "../../services/categories.service";
import { BgMusic } from "../../model/bg-music";
import { User } from "../../model/user";
import { ApiUrls } from "../../constants/ApiUrls";
import { DateUtil } from "../../Utils/DateUtil";
import { UserService } from "../../services/user.service";
import { Category } from 'src/app/model/category';
import { CategoryGroupModuleSessionFile } from 'src/app/model/category-group-module-session-file';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-audio-play',
  templateUrl: './audio-play.component.html',
  styleUrls: ['./audio-play.component.css']
})
export class AudioPlayComponent implements OnInit, OnDestroy {
  @Output()
  showSessionPlay: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isSessionCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() indexValue!: number;
  @Input() audioSrc!: string;
 
  @Input() courseId!: number;
  @Input() groupId!: number;
  @Input() moduleId!: number;

  @Input() moduleName!: string;
  @Input() haveMusic!: string;
  @Input() defaultMusicId!: number;
  @Input() isMulti!: string;

  @Input() sessionId!: number;
  @Input() sessionName!: string;
  @Input() selectedVoiceOption!: string;
  @Input() isSessionPlayed!: boolean;
  

  skipBack: string = "../../../assets/img/skipBack.png";
  skipAhead: string ="../../../assets/img/skipForward.png";
  backgroundMusics: Array<BgMusic> = [];
  backgroundMusicsFound: boolean = false;
  intervalTimer: any;
  audioPausedTime:any = 0;
  bgAudioPausedTime = 0;
  audioTime:any = 0;
  currentTimer = "00:00";
  totalDuration = "00:00";
  selectedBgValue: number = 0;
  showBgOptionModal: boolean = false;
  @ViewChild('bgAudio') bgAudio!: ElementRef;
  @ViewChild('sessionAudio') sessionAudio!: ElementRef;
  audioElement = new Audio();
  isAudioPlaying: boolean = false;
  @ViewChild('leftPercentage') leftPercentage!: ElementRef;
  @ViewChild('rightPercentage') rightPercentage!: ElementRef;
  files: Array<CategoryGroupModuleSessionFile> = [];
  selectedFileId = 0;
  selectedFile = "";
  selectedCourse!: Category;
  user!: User;

  circleProgress = -1;
  progress = 0;
  intervalId: any;


  current = -1;
  max = 100;

  isAudioReady: boolean = false;

  audioDuration: number = 0;

  constructor(private musicSingleService: MusicSingleService,private userService: UserService,  private categoriesService: CategoriesService, private renderer: Renderer2, private storageService: StorageService) { }
 

  ngOnInit(): void {
    // console.log(this.courseId, this.groupId, this.moduleId);
    this.getCategoryInfo(this.courseId);
    const currentUser = this.storageService.getCurrentUser();
    if(currentUser) {
      this.user = currentUser;
    }
    
    
    // this.fetchBgMusics();
    this.fetchSessionFiles(this.sessionId);
  }

  ngAfterViewInit() {
    this.renderer.setAttribute(this.sessionAudio.nativeElement, "src", this.audioSrc);
    this.audioElement =  this.sessionAudio.nativeElement;
    this.sessionAudio.nativeElement.volume = "0.5";
  }
  getCategoryInfo(id:number) {
    this.categoriesService.getCategoryInfo(id).subscribe(data => {
      const JSONData = JSON.parse(JSON.stringify(data));
      this.selectedCourse = JSONData[0];
    });
  }
  fetchSessionFiles(sessionId: number) {
    this.categoriesService.getSessionFilesBySessionId(sessionId, this.selectedVoiceOption).subscribe(response => {
      const JSONData = JSON.parse(JSON.stringify(response));
      
      if(JSONData['count'] === 0) {
        alert("No files available")
      } else if (JSONData['count'] > 0){
        this.fetchBgMusics();
        this.files = JSONData['data'];
        // this.selectedFile = this.files[0].audio_file_name;
        let canPlay = 'false';
        this.setAudioSrc(this.files[0], canPlay, 0);
        this.changeSelectedFile(0);
      } else {
        alert("Something went wrong, please try again after sometime");
      }
    });
  }

  changeSelectedFile(index: number) {
    this.files.forEach((file, fileIndex) => {
      if(index === fileIndex) { 
        file.isActive = true;
        this.selectedFileId = file.file_id;
      } else {
        file.isActive = false;
      }
    });
  }

  setAudioSrc(file: CategoryGroupModuleSessionFile, canPlay: string, index: number) {
    this.selectedFile = file.audio_file_name;
    this.audioSrc = ApiUrls.ONMOOD9_SESSION_FILE_PATH + file.file_name;
    this.isAudioReady = true;
    if(canPlay === 'true') {
      this.changeSelectedFile(index);
      this.audioPausedTime = 0;
      this.audioTime = 0;
      this.isAudioPlaying = false;
      this.startPlaying();
    }
  }

  

  fetchBgMusics() {
    this.musicSingleService.getActiveBgMusics().subscribe(data => {
      const JSONData = JSON.parse(JSON.stringify(data));

      if(JSONData['bgMusics'].length > 0) {
        this.backgroundMusicsFound = true;
      }
      this.backgroundMusics = JSONData['bgMusics'];
      this.backgroundMusics.forEach((element, index) => {
        element.index = index;
        element.audio_file = ApiUrls.ONMOOD9_BG_MUSIC_PATH + element.audio_file;
        element.is_selected = false;
        
        if(this.defaultMusicId === element.id) {
          this.selectedBgValue = index;
          element.is_selected = true;
        }
      });
    })
  }

  showSettings(isMulti: string) {
    // if(isMulti === 'yes') {
      this.showBgOptionModal = !this.showBgOptionModal; // Show-Hide Modal Check
    // }    
  }

  onSelectBgOption(option: any): void {
    // this.selectedMusic = music;
    this.selectedBgValue = option.index;
    let tempBgOpions = this.backgroundMusics;
    tempBgOpions.forEach(element => {
      if(element.index === option.index) {
        element.is_selected = true;
      } else {
        element.is_selected = false;
      }
    });
    this.backgroundMusics = tempBgOpions;
    this.startBGPlaying();
  }

  changeBgMusicVolume(vol: string) { 
    this.bgAudio.nativeElement.volume = Number(Number(vol)/10);
  }

  startBGPlaying(){
    if(this.isAudioPlaying) {
      if(this.backgroundMusics.length > 0) {
        this.bgAudio.nativeElement.src = this.backgroundMusics[this.selectedBgValue]['audio_file']; 
        this.bgAudio.nativeElement['currentTime'] = this.bgAudioPausedTime;
        if(this.haveMusic === "yes") {  
          this.bgAudio.nativeElement.play();
        }
      }
    }
  }

  stopBGPlaying(){
    this.bgAudioPausedTime = this.bgAudio.nativeElement['currentTime'];
    this.bgAudio.nativeElement.pause();
  }

  closeAudio() {
    if(this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }
    this.showSessionPlay.emit(false);
  }

  updateActiveModule(categoryId: number, moduleId: number) {
    this.categoriesService.updateActiveModule(categoryId, moduleId).subscribe(response => {
      
    });
  }

  startPlaying() {
    if(!this.isAudioPlaying) {
      // this.sessionAudio.nativeElement.play();
      this.sessionAudio.nativeElement.src = this.audioSrc; 
      this.sessionAudio.nativeElement['currentTime'] = this.audioPausedTime;   
      // this.sessionAudio.nativeElement.play();
      if(!this.audioElement) {
        this.audioElement = this.sessionAudio.nativeElement;
      }
      if(this.sessionAudio && this.sessionAudio.nativeElement){
        this.sessionAudio.nativeElement.play();
      }
      this.isAudioPlaying = true;
      this.startBGPlaying();
      this.intervalTimer = setInterval(() => {
        // if(this.audioElement) {
          this.audioPausedTime = this.audioElement['currentTime'];
        // } else {
          // this.audioPausedTime = 0;
        // }
        if(this.audioTime === 0) {
          this.audioElement = this.sessionAudio.nativeElement;
          this.audioTime = this.audioElement['duration']; 
          this.sessionAudio.nativeElement.play();
        }
        // console.log(this.audioTime);
        this.audioDuration = Math.floor(this.audioTime);
        if(this.totalDuration === "00:00") {
          this.audioElement = this.sessionAudio.nativeElement;
          this.totalDuration = DateUtil.convertNumberToTime(this.audioElement['duration']);  
        }
        this.currentTimer = DateUtil.convertNumberToTime(this.audioPausedTime);
        this.current = 100 * (this.audioPausedTime / this.audioTime);
        // console.log(this.audioPausedTime);
        // console.log(DateUtil.getTimeInSeconds(this.audioPausedTime));
      }, 1000);
      if(this.selectedCourse && (this.selectedCourse.active_module_id != this.moduleId)) {
        // update active module id
        this.updateActiveModule(this.selectedCourse.id, this.moduleId);
      }
    } else {
      this.isAudioPlaying = false;
      this.startPauseAudio();
      this.stopBGPlaying();
    }
  }

  audioEnded() {
    // console.log('ended!!');
    this.stopAudioPlay();
    this.stopBGPlaying();
    this.current = 0;
    this.currentTimer = "00:00";
    this.audioPausedTime = 0;
    this.audioTime = 0;

    // as session has completed, save this session id in db
    if(!this.isSessionPlayed) {
      // console.log("Session has completed, So Saving the session......")
      this.saveUserSessionPlay('Y', true);
    } else {
      this.saveUserSessionPlay('N', true);
    }
  }



  saveUserSessionPlay(isFullyListened: string, isAudioEnded: boolean) {

    let payload = {
      "userId":this.user.id,
      "sessionId": this.sessionId,
      "category_id": this.courseId,
      "group_id": this.groupId,
      "module_id": this.moduleId,
      "file_id": this.selectedFileId,
      "listened_time": isFullyListened === 'Y' ? this.audioDuration : (isAudioEnded ? this.audioDuration : DateUtil.getTimeInSeconds(this.audioPausedTime)),
      "is_fully_listened": isFullyListened,
      "is_repeated_fully": (isFullyListened === 'Y' || isAudioEnded) ? 'Y' : 'N'
    }
    this.userService.saveUserPlayedSession(payload).subscribe(response => { 
      if(response['status'] === true) {
        this.isSessionCompleted.emit(true);
      }
    })
  }

  resetPlayAudio() {
    if(this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }
    this.sessionAudio.nativeElement.currentTime = 0; 
  }
  startPlayAudio() {
    this.sessionAudio.nativeElement.play();
  }

  startPauseAudio() {
    this.sessionAudio.nativeElement.pause();
    if(this.intervalTimer) {
      // console.log("-------------------------")
      clearInterval(this.intervalTimer);
    }
  }
  stopAudioPlay() {
    this.isAudioPlaying = false;
    this.startPauseAudio();
    this.resetPlayAudio();
    this.stopBGPlaying();
  }
  
  changeSessionVolume(vol: string) {
    // console.log(vol);
    this.sessionAudio.nativeElement.volume = Number(Number(vol)/10); 
  }

  moveAudio(type: number) {
    if(type === 0) {
      // forward 15sec
      this.sessionAudio.nativeElement.currentTime = this.sessionAudio.nativeElement.currentTime + 15; 
    
    } else if(type === 1){
      // backward 15sec
      this.sessionAudio.nativeElement.currentTime = this.sessionAudio.nativeElement.currentTime - 15; 
    }
  }

  ngOnDestroy() {
    if(this.audioPausedTime > 0){
      const isFullyPlayed = parseInt(this.audioPausedTime) === parseInt(this.audioTime) ? 'Y' : 'N';
      this.saveUserSessionPlay(isFullyPlayed, false);
    }
  }
  

}
