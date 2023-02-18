import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs/index';
import { environment } from '../../environments/environment';
import {Blog} from '../model/blog';
import { ApiUrls } from "../constants/ApiUrls";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

	@Output() tagClickEvent: EventEmitter<any> = new EventEmitter();
  dataChange: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>([]);
	// Temporarily stores data from dialogs
	dialogData: any;

	constructor (private httpClient: HttpClient) {}

	get data(): Blog[] {
		return this.dataChange.value;
	}

	getAllBlog(): Observable<Blog[]> {
		return this.httpClient.get<Blog[]>(ApiUrls.GET_BLOGS_URL);
	}
	getActiveBlogs(): Observable<Blog[]> {
		return this.httpClient.get<Blog[]>(ApiUrls.GET_ACTIVE_BLOGS_URL);
	}
	getNextActiveBlogs(publish_date: string): Observable<Blog[]> {
		let url = ApiUrls.GET_NEXT_ACTIVE_BLOGS_URL.replace("{publish_date}", publish_date);
		// console.log(url);
		return this.httpClient.get<Blog[]>(url);
		// return this.httpClient.get<Blog[]>(ApiUrls.GET_NEXT_ACTIVE_BLOGS_URL);
	}
	
	getMostViewedActiveBlogs(): Observable<Blog[]> {
		return this.httpClient.get<Blog[]>(ApiUrls.GET_MOST_VIEWED_ACTIVE_BLOGS_URL);
	}

	getVideoBlogs(): Observable<Blog[]> {
		return this.httpClient.get<Blog[]>(ApiUrls.GET_VIDEO_BLOGS_URL);
	}

	getTextualBlogs(): Observable<Blog[]> {
		return this.httpClient.get<Blog[]>(ApiUrls.GET_TEXTUAL_BLOGS_URL);
	}

	getBlogsBySearch(keyword: string): Observable<Blog[]> {
		let input = new FormData();
    input.append("keyword", keyword);
    return this.httpClient.post<Blog[]>(ApiUrls.GET_SEARCH_BLOGS_URL, input);
	}
	getTagBasedBlogs(selectedTags: string): Observable<Blog[]> {
		let input = new FormData();
    input.append("keyword", selectedTags);
    return this.httpClient.post<Blog[]>(ApiUrls.GET_TAG_BASED_BLOGS_URL, input);
	}	

	getCategoryBlogs(id: string): Observable<Blog[]> {
		let url = ApiUrls.GET_CATEGORY_BLOGS_URL.replace("{id}", id);
		return this.httpClient.get<Blog[]>(url);
	}
	getBlogById(id: string): Observable<Blog[]> {
		let url = ApiUrls.GET_BLOG_DETAILS_URL.replace("{id}", id);
		return this.httpClient.get<Blog[]>(url);
	}
	increaseViewCount(id: string, count: number){
		if(typeof(count) === 'string') {
			count = parseInt(count);
		}
		let ip = {
			"id":id,
			"count": count + 1
		};
		
		return this.httpClient.put(ApiUrls.UPDATE_BLOG_COUNT_URL, ip);
	}	

	triggerTagEvent(selectedTags: string) {
		this.tagClickEvent.emit(selectedTags);
	}
}
