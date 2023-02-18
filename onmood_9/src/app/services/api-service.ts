import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../constants/ApiUrls';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  makeGetRequest(url: string) {
    return this.http.get<any>(url);
  }

  makePostRequest(url: string, body:any) {
    return this.http.post<any>(url, body);
  }

  // Onmood9 Moods
  getOnmood9Moods() {
    return this.http.get<any>(ApiUrls.GET_ONMOOD9_MOODS_URL);
  }
  getMeditateCourses() {
    let url = ApiUrls.GET_CATEGORIES_BY_TYPE_URL.replace('{id}', ""+ApiUrls.MEDITATE_ID);
    return this.http.get<any>(url);
  }

  getHomePageDimensions() {
    let url = ApiUrls.GET_HOME_PAGE_DIMENSIONS_URL;
    let input = new FormData();
    input.append("page_id", ""+ApiUrls.HOME_PAGE_ID);
    return this.http.post<any>(url, input);
  }

  
  getMeditationSeriesModules2() {
    let input = new FormData();
    input.append("id", ""+ApiUrls.MEDITATION_SERIES_ID);
    return this.http.post<any>(ApiUrls.GET_MEDITATION_MODULES_BY_SERIES_ID_URL, input);
  }

  getMeditationSingleModules2() {
    let input = new FormData();
    input.append("id", ""+ApiUrls.MEDITATION_SINGLE_ID);
    return this.http.post<any>(ApiUrls.GET_MEDITATION_MODULES_BY_SERIES_ID_URL, input);
  }

  getFeaturedModules() {
    return this.http.get<any>(ApiUrls.GET_FEATURED_MODULES_URL);
  }

  getMeditationModules() {
    let input = new FormData();
    input.append("id", ""+ApiUrls.MEDITATE_ID);
    return this.http.post<any>(ApiUrls.GET_MEDITATE_MODULES_BY_RELAX_ID_URL, input);
  }

  getRelaxMusicModules() {
    let input = new FormData();
    input.append("id", ""+ApiUrls.RELAX_ID);
    return this.http.post<any>(ApiUrls.GET_RELAX_MODULES_BY_RELAX_ID_URL, input);
  }

  getLearnCourses() {
    let url = ApiUrls.GET_CATEGORIES_BY_TYPE_URL.replace('{id}', ""+ApiUrls.LEARN_ID);
    return this.http.get<any>(url);
  }
  

  getMeditationSeriesModules(dimensions:any) {
    let input = new FormData();
    input.append("id", ""+ApiUrls.MEDITATION_SERIES_ID);
    input.append("newWidth", dimensions.width);
    input.append("newHeight", dimensions.height);
    return this.http.post<any>(ApiUrls.GET_MEDITATION_MODULES_BY_SERIES_ID_URL, input);
  }

  getMeditationSingleModules(dimensions:any) {
    let input = new FormData();
    input.append("id", ""+ApiUrls.MEDITATION_SINGLE_ID);
    input.append("newWidth", dimensions.width);
    input.append("newHeight", dimensions.height);
    return this.http.post<any>(ApiUrls.GET_MEDITATION_MODULES_BY_SERIES_ID_URL, input);
  }

  getRelaxCourses() {
    return this.http.get<any>(ApiUrls.GET_CATEGORIES_BY_TYPE_URL.replace('{id}', ""+ApiUrls.RELAX_ID));
  }

  getTopVisitModules(categoryId:number) {
    return this.http.get<any>(ApiUrls.GET_TOP_VISIT_MODULES_URL.replace('{category_id}', ""+categoryId));
  }


  getAllCategoriesWithGroupCount1(categoryId:number) {
    return this.http.get<any>(ApiUrls.GET_CATEGORIES_WITH_GROUP_COUNT1_URL.replace('{id}', ""+categoryId));
  }

  // Onmood9 Videos
  getVideoById(id:number) {
    return this.http.get<any>(ApiUrls.GET_LIBRARY_VIDEO_URL.replace("{id}", ""+id));
  }
}