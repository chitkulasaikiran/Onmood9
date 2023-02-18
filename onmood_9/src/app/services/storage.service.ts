import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { CURRENT_SUBSCRIPTION, CURRENT_USER, IS_LOGGEDIN, SESSION_EXPIRES_ON } from '../constants/Constants';
const SECRET_KEY = 'SjlE2w3Be472mc3rdhet_kedy_KweYl1h87e23';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }


  storeItem(key: string, value: any) {
    window.localStorage.setItem(key, this.encrypt(value));
  }

  getItem(key: string) {
    return this.decrypt(window.localStorage.getItem(key));
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);   
  }

  getUserId() {
    const user = JSON.parse(JSON.parse(JSON.stringify(this.getItem(CURRENT_USER))));
    return user.id;
  }

  clearStorage() {
    window.localStorage.clear();
  }

  getCurrentUser() {
      return JSON.parse(JSON.parse(JSON.stringify(this.getItem(CURRENT_USER))));
  }

  isUserLoggedIn() {
    return this.getItem(IS_LOGGEDIN);
  }

  isSessionExpired() {
   return new Date(JSON.parse(this.getItem(SESSION_EXPIRES_ON))) < new Date();
  }

  async isSubscriptionActive() {
    let isActive = false;
    let currentSubscription = await JSON.parse(this.getItem(CURRENT_SUBSCRIPTION));
    if (currentSubscription != null && 
      currentSubscription.is_cancelled === 'N' &&
      new Date(currentSubscription.start_date) <= new Date() && 
      new Date(currentSubscription.end_date) >= new Date()) {
        isActive = true;
    }
    return isActive;
  }



  encrypt(data: any) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  }

  decrypt(data: any) {
    if(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
    } else {
      data = null;
    }
    return data;
  }
}
