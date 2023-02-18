import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../constants/ApiUrls';
import { CUNIQUE_ID } from '../constants/Constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http:HttpClient, private storageService: StorageService) { }

  getCorpActiveSubscriptions() {
    return this.http.get<any>(ApiUrls.GET_CORP_SUBSCRIPTIONS_URL+this.storageService.getItem(CUNIQUE_ID));
  }
}
