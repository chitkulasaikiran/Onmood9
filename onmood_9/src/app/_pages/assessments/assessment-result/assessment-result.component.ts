import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-assessment-result',
  templateUrl: './assessment-result.component-new.html',
  styleUrls: ['./assessment-result.component.css']
})
export class AssessmentResultComponent implements OnInit {

  constructor(private pageService:PageService,private router:Router) { }
  result:any //this.pageService.resultAssessment;
  rulesInfo: Array<any> = [];
  @Input() testResult:any = {};
  @Input() historyItemSelected:any = {};
  
  @Output()viewHistoryBtnClick = new EventEmitter()

  ngOnInit(): void {
    // console.log(this.testResult)
    this.generateResultBasedOnRules();
  }
  generateResultBasedOnRules(){
    this.rulesInfo = [];
    const score = this.historyItemSelected?.score;
    this.testResult.rules.forEach((element:any) => {
      console.log(score, element.min_score, element.max_score)
      if(Number(score) >= Number(element.min_score) && Number(score) <= Number(element.max_score)){
        console.log(score, element.min_score, element.max_score)
        this.rulesInfo.push(element);
      }
    });
  }

  navigateToHistory() {
		this.router.navigate(['/assessments', ]);
	}
	viewHistory() {
		this.router.navigate(['/assessments/history', ]);
    this.viewHistoryBtnClick.emit(true);
	}

}
