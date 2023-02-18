import { Injectable } from '@angular/core';
import { ApiUrls } from "../constants/ApiUrls";
import { Page } from "../model/page";
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/index';
@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private httpClient: HttpClient) { }
  getPageMetaByName(name: string) {
		let url = ApiUrls.GET_PAGE_META_DETAILS_URL.replace("{name}", ""+name)
		return this.httpClient.get(url);
	}
}
