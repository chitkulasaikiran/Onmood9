import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-assessment-history',
  templateUrl: './assessment-history.component-new.html',
  styleUrls: ['./assessment-history.component.css']
})
export class AssessmentHistoryComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,  public assessmentService: AssessmentService, private storageService: StorageService) { }
  assessment = {};
  history: Array<any> = [];
  historyItemSelected: any = {}; 
  resultSelected = false;
  selectedResult:any = {};
  isLoading = false;
  isItemSelected: string = "false";
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      // console.log(params);
      // console.log(params['params']['isItemSelected']);
      this.isItemSelected = String(params.get('isItemSelected'));
    })
    if (Object.keys(this.assessmentService.selectedTest).length === 0) {
      this.router.navigate(['/assessments',]);
    } else {
      console.log(this.assessmentService.selectedTest)
      this.getAttendedAssessments();
    }
  }
  getAttendedAssessments() {
    this.isLoading = true;
    const currentUser = this.storageService.getCurrentUser();
    let userId = currentUser.id;
    this.assessmentService.getAttendedAssessments(userId, this.assessmentService.selectedTest.id).subscribe(result => {
      this.history = result.data;
      // console.log(result)
      this.isLoading = false;
      // console.log(this.isItemSelected, this.history[0]);
      // console.log(typeof(this.isItemSelected));
      if(this.isItemSelected === "true" && this.history.length > 0) {
        this.resultSelect(this.history[0])
      }
    })
  }
  backClick() {
    this.router.navigate(['/assessments/details',]);

  }
  resultSelect(item:any) {
    this.resultSelected = true;
    this.historyItemSelected = item;
    this.selectedResult = this.assessmentService.selectedTest;
    this.selectedResult.finished_on = item.finished_on;
    this.selectedResult.total_score = item.score;

  }
  beginTest() {
		this.router.navigate(['/assessments/details', ]);
	}

}
