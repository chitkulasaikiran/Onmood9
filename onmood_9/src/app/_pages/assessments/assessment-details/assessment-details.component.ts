import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { AssessmentService } from 'src/app/services/assessment.service';
import { PageService } from 'src/app/services/page.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-assessment-details',
	templateUrl: './assessment-details.component-new.html',
	styleUrls: ['./assessment-details.component.css']
}) 
export class AssessmentDetailsComponent implements OnInit {
	activeQuestion = 0;
	startDate = new Date();
	endDate = new Date();
	isTestCompleted = false;
	savedTestData = {};
	@ViewChild('closeIcon')
	closeIcon!: ElementRef;// = new ElementRef();
	constructor(private assessmentService: AssessmentService, private router: Router, private datePipe:DatePipe, private storageService: StorageService) {}
	assessment:any; //{title: '', description: ''};
	ngOnInit(): void {
		this.assessment = this.assessmentService.selectedTest;
		// console.log(this.assessment)
		// if (Object.keys(this.assessment).length === 0) {
		if (Object.keys(this.assessmentService.selectedTest).length === 0) {
			this.router.navigate(['/assessments', ]);
		}
	}
	beginTest() {
		this.router.navigate(['/assessments/test', ]);
	}
	viewHistory() {
		this.router.navigate(['/assessments/history', ]);
	}

	optionChange(que:any, opt:any) {
		// que.weightage = opt.weightage;
		que.option_id = opt.id;
		que.question_id = que.id;
		que.score = opt.score
	}

	resetQuestionOptions() {
		this.activeQuestion = 0;
		console.log("resetQuestionOptions is called")
		this.assessment.questions.forEach((question:any) => {
			question.option_id = undefined;
			question.optionId = undefined;
			question.question_id = question.id;
			question.score = undefined
		});
		this.closeIcon.nativeElement.click();
	}

	submitAnswers(que:any, assessment:any) {
		this.endDate = new Date();
		this.saveAssessment();
	
	  }
	  saveAssessment() {
		const currentUser = this.storageService.getCurrentUser();
		let options: any = [];
		let totalScore = 0;
		this.assessment.questions.forEach((element:any) => {
		  options.push({
			"question_id": element.id,
			"option_id": element.option_id,
			"score": element.score
		  })
		  totalScore = totalScore + Number(element.score);
		});
		const payLoad = {
		  "user_id": currentUser.id,
		  "assessment_id": this.assessment.id,
		  "started_on": this.datePipe.transform(this.startDate,'yyyy-MM-dd HH:mm:ss'),
		  "finished_on": this.datePipe.transform(this.endDate,'yyyy-MM-dd HH:mm:ss'),
		  "total_score": totalScore,
		  "options": options
		}
		this.assessmentService.saveAssessmentTest(payLoad).subscribe(result =>{
		  // console.log(result.data)
		  this.savedTestData = {...payLoad,...this.assessment};
		  this.isTestCompleted = true;
		  this.closeIcon.nativeElement.click();
		  this.resetQuestionOptions();
			// this.viewHistory(true);
			this.router.navigate(['/assessments/history', {isItemSelected: true}]);
		})
	  }
}
