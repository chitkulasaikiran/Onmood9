import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { ApiUrls } from "../constants/ApiUrls";
import { MusicSingle } from "../model/music-single";
import { BgMusic } from "../model/bg-music";

@Injectable({
  providedIn: 'root'
})
export class MusicSingleService {
  constructor (private httpClient: HttpClient) {}

  getActiveMusicSingles(): Observable<MusicSingle[]> {
		return this.httpClient.get<MusicSingle[]>(ApiUrls.GET_ACTIVE_MUSIC_SINGLES_URL);
	}

  getActiveBgMusics(): Observable<BgMusic[]> {
		return this.httpClient.get<BgMusic[]>(ApiUrls.GET_ACTIVE_BACKGROUND_MUSICS_URL);
	}
}