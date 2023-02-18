import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Aos from 'aos';
import { ApiUrls } from 'src/app/constants/ApiUrls';
import { CORP, CURRENT_SUBSCRIPTION, INDI, USER_TYPE } from 'src/app/constants/Constants';
import { CategoryGroupModule } from 'src/app/model/category-group-module';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModuleService } from 'src/app/services/module.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-course-group-module',
  templateUrl: './course-group-module.component.html',
  styleUrls: ['./course-group-module.component.css']
})
export class CourseGroupModuleComponent implements OnInit {

  image = "http://localhost/meditation_server/uploads/courses/images/meditation.jpg";
  moduleImagePath = "";
  
  courseId = 0;
  groupId = 0;
  selectedGroupName = "";
  groupModules: Array<CategoryGroupModule> = [];
  categoryId = 0;
  noModulesText = "";
  haveActiveSubscription: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private categoriesService: CategoriesService,private subscriptionService: SubscriptionService, private storageService: StorageService, private moduleService: ModuleService) { 
    this.moduleImagePath = ApiUrls.ONMOOD9_COURSE_IMAGES_PATH;
  }

  ngOnInit(): void {
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
      this.categoryId =  Number(params.get('category-id'));
      let courseType =  Number(params.get('course-id')); 
      if(!isNaN(Number(courseType))) {
        let  numberValue = Number(courseType);
        this.courseId = numberValue;
        // this.getGroupsByCategory(this.courseId);
        let groupType =  Number(params.get('group-id')); 
        if(!isNaN(Number(groupType))) {
          let  groupNumberValue = Number(groupType);
          this.groupId = groupNumberValue;
          this.getGroupInfo(this.groupId);
          this.getModulesByGroup(this.groupId);
        } else {

        }
      } else {
          // console.log('Not a Number');
      }
    });
  }

  getGroupInfo(id:number) {
    this.categoriesService.getGroupInfo(id).subscribe(data => { 
      const JSONData = JSON.parse(JSON.stringify(data));

      this.selectedGroupName = JSONData[0].group_name;
    });
  }

  getModulesByGroup(id:number) { 
    this.categoriesService.getModulesByGroupId(id).subscribe(data => { 
      // this.categories = data;
      const JSONData = JSON.parse(JSON.stringify(data));
      if(JSONData['result'] === "success" && JSONData['data'].length > 0) {
        this.noModulesText = "";
        this.groupModules = JSONData['data'];
        let object = {
          haveActiveSubscription: this.haveActiveSubscription,
          categoryId: this.categoryId,
          courseId: this.courseId,
          groupId: this.groupId
        };
        this.moduleService.prepareModuleLinks(this.groupModules, object);
      } else {
        this.noModulesText = "No modules available";
      }
    });
  }

  prepareModuleLinksModule(modules: Array<CategoryGroupModule>) {
    modules.forEach(module => {
      if(this.storageService.getItem(USER_TYPE) === CORP) {
        if(!this.haveActiveSubscription && module.is_paid === "paid") {
            module.sessionLinkAvailable = false;
            module.showLockIcon = true;
        } else {
          module.sessionsLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+this.groupId+"/module/"+module.id+"/sessions";
            module.sessionLinkAvailable = true;
            module.showLockIcon = false;
        }
      } else if(this.storageService.getItem(USER_TYPE) === INDI) {
        if(module.is_paid === "free") {
          module.sessionsLink = "/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/group/"+this.groupId+"/module/"+module.id+"/sessions";
          module.sessionLinkAvailable = true;
          module.showLockIcon = false;
        } else {
          module.sessionLinkAvailable = false;
          module.showLockIcon = true;
        }
      }
    });
  }

goBack() { 
    this.router.navigate(["/onmood-course/"+this.categoryId+"/course/"+this.courseId+"/groups"]);
}

}
