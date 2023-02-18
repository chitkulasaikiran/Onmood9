import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/index';
import { ApiUrls } from "../constants/ApiUrls";
import { OnmoodCourseType } from '../model/onmood-course-type';
import { Category } from '../model/category';
import { CategoryGroup } from '../model/category-group';
import { CategoryGroupModule } from '../model/category-group-module';
import { CategoryGroupModuleSession } from '../model/category-group-module-session';
import { CategoryGroupModuleSessionFile } from '../model/category-group-module-session-file';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  // Category types
  getAllOnmoodCourseTypes(): Observable<OnmoodCourseType[]> {
		return this.httpClient.get<OnmoodCourseType[]>(ApiUrls.ONMOOD_COURSE_TYPES_URL);
	}

  getOnmoodCourseInfo(id:number) {
    let url = ApiUrls.ONMOOD_COURSE_TYPE_DETAILS_URL.replace("{id}", ""+id);
    return this.httpClient.get(url);
  }
  

  // Categories
  getAllCategories(): Observable<Category[]> {
		return this.httpClient.get<Category[]>(ApiUrls.GET_CATEGORIES_URL);
	}
  getCategoriesByCourseId(courseId:number): Observable<Category[]> {
		return this.httpClient.get<Category[]>(ApiUrls.GET_CATEGORIES_WITH_GROUP_COUNT1_URL.replace("{id}", ""+courseId));
	}
  
  getCategoryInfo(id:number) {
    let url = ApiUrls.GET_CATEGORY_DETAILS_URL.replace("{id}", ""+id);
    return this.httpClient.get(url);
  }

  updateActiveModule(categoryId:number, moduleId:number) {
    let input = new FormData();
    input.append("category_id", categoryId+"");
    input.append("module_id", moduleId+"");
    return this.httpClient.post<any>(ApiUrls.UPDATE_CATEGORY_ACTIVE_MODULE_URL, input);
  }

  // Groups
  getGroupsByCategoryId(id:number): Observable<CategoryGroup[]> {
    let url = ApiUrls.GET_CATEGORY_GROUPS_BY_CATEGORY_URL.replace("{id}", ""+id)
		// console.log(url);
		return this.httpClient.get<CategoryGroup[]>(url);
	}
  getGroupInfo(id:number) {
    let url = ApiUrls.GET_CATEGORY_GROUP_DETAILS_URL.replace("{id}", ""+id);
    return this.httpClient.get(url);
  }

  getGroupsWithModulesInfo(id:number) {
    let url = ApiUrls.GET_CATEGORY_GROUPS_WITH_MODULES_URL.replace("{id}", ""+id);
    return this.httpClient.get(url);
  }


  // Modules
  getModulesByGroupId(id:number): Observable<CategoryGroupModule[]> {
    let url = ApiUrls.GET_CATEGORY_GROUP_MODULES_BY_GROUP_ID_URL.replace("{id}", ""+id)
		// console.log(url);
		return this.httpClient.get<CategoryGroupModule[]>(url);
	}
  getModuleDetails(id:number) {
    let url = ApiUrls.GET_CATEGORY_GROUP_MODULE_DETAILS_URL.replace("{id}", ""+id)
		// console.log(url);
		return this.httpClient.get<any>(url);
  }
  getModuleVideos(module_id:number) {
		let url = ApiUrls.GET_CATEGORY_GROUP_MODULE_VIDEOS_URL.replace("{module_id}", module_id+"");
		// console.log(url);
		return this.httpClient.get(url);
	}
  // Sessions
  getSessionsByModuleId(id:number): Observable<CategoryGroupModuleSession[]> {
    let url = ApiUrls.GET_CATEGORY_GROUP_MODULE_SESSIONS_BY_MODULE_ID_URL.replace("{id}", ""+id)
		// console.log(url);
		return this.httpClient.get<CategoryGroupModuleSession[]>(url);
	}
  getSessionFilesBySessionId(id:number, voiceType:string): Observable<CategoryGroupModuleSessionFile[]> {
    let url = "";
    if(voiceType === 'M') {
      url = ApiUrls.GET_CATEGORY_GROUP_MODULE_MALE_VOICE_SESSION_FILES_BY_SESSION_ID_URL.replace("{id}", ""+id)
    } else if(voiceType === 'F') {
      url = ApiUrls.GET_CATEGORY_GROUP_MODULE_FEMALE_VOICE_SESSION_FILES_BY_SESSION_ID_URL.replace("{id}", ""+id)
    } else if(voiceType === 'A') {
      url = ApiUrls.GET_CATEGORY_GROUP_MODULE_AUDIO_SESSION_FILES_BY_SESSION_ID_URL.replace("{id}", ""+id)
    }
		// console.log(url);
		return this.httpClient.get<CategoryGroupModuleSessionFile[]>(url);
	}

  // Onmood9 Videos
  getVideoById(id: number) {
    return this.httpClient.get<any>(ApiUrls.GET_LIBRARY_VIDEO_URL.replace("{id}", id+""));
  }
  
}
