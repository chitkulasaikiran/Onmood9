import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { PageService } from 'src/app/services/page.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-assessment-test',
  templateUrl: './assessment-test.component.html',
  styleUrls: ['./assessment-test.component.css']
})
export class AssessmentTestComponent implements OnInit {

  constructor(private assessmentService: AssessmentService, 
    private router: Router,private datePipe:DatePipe, private storageService: StorageService) { }
  assessment: any = {};
  startDate = new Date();
  endDate = new Date();
  isTestCompleted = false;
  savedTestData = {};
  ngOnInit(): void {
    this.assessment = this.assessmentService.selectedTest;
    this.startDate = new Date();
    if (Object.keys(this.assessment).length === 0) {
      this.router.navigate(['/assessments',]);
    }
    this.isTestCompleted = false;
  }
  activeQuestion = 0;
  submitAnswers(que:any, assessment:any) {
    this.endDate = new Date();
    this.saveAssessment();

  }
  saveAssessment() {
    const currentUser = this.storageService.getCurrentUser();
    let options: Array<any> = [];
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
      "started_on": this.datePipe.transform(this.startDate,'yyyy-MM-dd hh:mm:ss'),
      "finished_on": this.datePipe.transform(this.endDate,'yyyy-MM-dd hh:mm:ss'),
      "total_score": totalScore,
      "options": options
    }
    this.assessmentService.saveAssessmentTest(payLoad).subscribe(result =>{
      // console.log(result.data)
      this.savedTestData = {...payLoad,...this.assessment};
      this.isTestCompleted = true;
      this.router.navigate(['/assessments', ]);
    })
  }
  optionChange(que:any, opt:any) {
    // que.weightage = opt.weightage;
    que.option_id = opt.id;
    que.question_id = que.id;
    que.score = opt.score
  }
  cancelTest(){
    this.router.navigate(['/assessments',]);
  }
  navigateToAssessments(){
    this.router.navigate(['/assessments',]);
  }
  navigateToHistory(){
    this.router.navigate(['/assessments/history',]);
  }
}
