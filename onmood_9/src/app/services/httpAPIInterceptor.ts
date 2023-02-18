import {
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
import { TOKEN } from "../constants/Constants";
import { StorageService } from "./storage.service";
  @Injectable()
  export default class HttpAPIInterceptor implements HttpInterceptor {
	constructor(private storageService: StorageService) {

	}
	intercept(request: HttpRequest<any>, next: HttpHandler) {
	  let token = this.storageService.getItem(TOKEN);
	  let newRequest = null;
	  const headers = new HttpHeaders().set('Token', ""+token );
	  const url = `${request.url}`;
	  if (token != null) {
		newRequest = request.clone({ headers, url });
	  } else {
		newRequest = request.clone({ url });
	  }
	  return next.handle(newRequest);
	}
  }
  