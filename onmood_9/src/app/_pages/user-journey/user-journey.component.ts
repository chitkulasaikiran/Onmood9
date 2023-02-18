import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';
import { StorageService } from 'src/app/services/storage.service';
import { DateUtil } from 'src/app/Utils/DateUtil';

@Component({
  selector: 'app-user-journey',
  templateUrl: './user-journey.component.html',
  styleUrls: ['./user-journey.component.css']
})
export class UserJourneyComponent implements OnInit {

  constructor(private sessionService: SessionsService, private storageService: StorageService) { }
	selectedOptionInd = 0;
	selectedSessionInd = -1;
	visitedCategories: Array<any> = [];
	completedHours = '0.00';
	completedSessions = [];
	ngOnInit(): void {
		this.getVisistedModules();
	}
	getVisistedModules() {
		this.sessionService.getUserVisitedCategories().subscribe((result: any) => {
			this.visitedCategories = result.data;
			if (result.data && result.data.length > 0) {
				// this.getData();
				this.getJourneyData();
			}
		})
	}

	getJourneyData() {
		let payLoad = this.createPayload();
		if(this.selectedSessionInd === -1) {
			this.getData2(payLoad);
		} else {
			this.getData(payLoad);
		}
	}

	createPayload() {
		const today = new Date();
		let fromDate: any = new Date();
		let toDate = new Date();
		if (this.selectedOptionInd === 0) {
			fromDate = fromDate.setDate(fromDate.getDate() - 7);
		}
		if (this.selectedOptionInd === 1) {
			fromDate = fromDate.setDate(fromDate.getDate() - 30);
		}
		if (this.selectedOptionInd === 2) {
			fromDate = fromDate.setDate(fromDate.getDate() - 365);
		}
		if (this.selectedOptionInd === 3) {
			fromDate = fromDate.setDate(fromDate.getDate() - 1825);
		}
		const user = this.storageService.getCurrentUser();
		const catId = (this.selectedSessionInd === -1) ? 0 : this.visitedCategories[this.selectedSessionInd].id;
		const payLoad: any = {
			"fromDate": new Date(fromDate),
			"toDate": toDate,
			"userId": user.id,
			"categoryId": catId
		}
		return payLoad;
	}

	getData(payLoad: any) {
		this.sessionService.getUserPlayedSessionsWithDateRange(payLoad).subscribe((result: any) => {
			// console.log(result);
			this.processJourneyData(result);
		})
	}

	getData2(payLoad: any) {
		this.sessionService.getUserPlayedSessionsWithDateRangeAllCategories(payLoad).subscribe((result: any) => {
			// console.log(result);
			this.processJourneyData(result);
		})
	}

	processJourneyData(result: any) {
		const data = result.data;
		const sumall = data.map((item:any) => item.listened_time).reduce((prev:any, curr:any) => Number(prev) + Number(curr), 0);
		// console.log(sumall);
		// console.log(DateUtil.secondsToHms(sumall));
		// this.completedHours = (sumall / (60 * 60)).toFixed(2);
		this.completedHours = DateUtil.secondsToHms(sumall);
		this.completedSessions = data.filter((item:any) => item.is_fully_listened === 'Y');
	}

}
