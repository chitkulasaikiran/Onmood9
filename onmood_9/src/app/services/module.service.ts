import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {ApiUrls} from './../constants/ApiUrls';
import { CategoryGroupModule } from '../model/category-group-module';
import { StorageService } from './storage.service';
import { CORP, INDI, USER_TYPE } from '../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public getCourseModules(courseId:number)
  {
    let url = ApiUrls.GET_COURCE_MODULES_URL.replace('{courseId}', ""+courseId);
    return this.httpClient.get(url).pipe(retry(3),catchError(this.handleError));
  }


  public prepareModuleLinks(modules: Array<CategoryGroupModule>, objectInput: any) {
    modules.forEach(module => {
      if(this.storageService.getItem(USER_TYPE) === CORP) {
        if(!objectInput.haveActiveSubscription && module.is_paid === "paid") {
            module.sessionLinkAvailable = false;
            module.showLockIcon = true;
        } else {
          module.sessionsLink = "/onmood-course/"+objectInput.categoryId+"/course/"+objectInput.courseId+"/group/"+objectInput.groupId+"/module/"+module.id+"/sessions";
            module.sessionLinkAvailable = true;
            module.showLockIcon = false;
        }
      } else if(this.storageService.getItem(USER_TYPE) === INDI) {
        if(module.is_paid === "free") {
          module.sessionsLink = "/onmood-course/"+objectInput.categoryId+"/course/"+objectInput.courseId+"/group/"+objectInput.groupId+"/module/"+module.id+"/sessions";
          module.sessionLinkAvailable = true;
          module.showLockIcon = false;
        } else {
          module.sessionLinkAvailable = false;
          module.showLockIcon = true;
        }
      }
    });
    // return modules;
  }
}
