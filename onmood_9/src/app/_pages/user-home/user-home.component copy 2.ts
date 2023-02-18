
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

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  
  constructor(private router: Router, private apiService: ApiService, private categoriesService: CategoriesService, 
    private blogService: BlogService,private moodTrackerService:MoodTrackerService, private sessionService: SessionsService) {
   
  }


  
  ngOnInit(): void {
   
  }



  getMeditationModules() {
    this.apiService.getMeditationModules().subscribe(response => {
      // this.meditateModules.modules = response['modules'];
      this.processModules2(response['modules'], 'MEDITATE') 

      let copiedCustomOptions = Object.assign({}, this.customOptions);
      copiedCustomOptions.items = this.deviceWidth > this.deviceHeight ? 5 : 2.5;

      this.meditateModules.customOptions = copiedCustomOptions;
      this.meditateModules.height = this.deviceWidth > this.deviceHeight ? 200 : 110;
      // console.log(this.meditateModules.modules);
    });
  }

  
  meditateModules = { customOptions: { items: 0 }, height: 0 };


  processModules2(modules:Array<CategoryGroupModule>, type: string) {
    let uniqueModules : UniqueModule[] = [];
    let tempModules:any = [];
    // this.meditateModules
    modules.forEach((module:CategoryGroupModule) => {
      if(tempModules.indexOf(module.id) === -1) {
        let um: UniqueModule = {
          module : module,
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

    // this.setModules(type, uniqueModules);
    let arr = [{
      uniqueUsers: 0,
      uniqueUsersCount: 1,
      module: CategoryGroupModule
  },
  {
      uniqueUsers: 0,
      uniqueUsersCount: 1,
      module: CategoryGroupModule
  },
  {
      uniqueUsers: 0,
      uniqueUsersCount: 1,
      module: CategoryGroupModule
  }];
  arr.sort((a,b) => Number(b.uniqueUsersCount) - Number(a.uniqueUsersCount));
    // this.meditateModules.modules; // = uniqueModules;
    // this.meditateModules = { ...this.meditateModules, modules: uniqueModules};
    this.meditateModules = Object.assign(this.meditateModules, {modules: uniqueModules});
    this.meditateModules.modules.sort((a, b) => Number(b.uniqueUsersCount) - Number(a.uniqueUsersCount));
  }


}