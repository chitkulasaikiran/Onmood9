import {
	Component,
	OnInit
} from '@angular/core';
import {
	Router
} from '@angular/router';
import {
	AssessmentService
} from 'src/app/services/assessment.service';
import {
	PageService
} from 'src/app/services/page.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-assessments-list',
	templateUrl: './assessments-list.component.html',
	styleUrls: ['./assessments-list.component.css']
})
export class AssessmentsListComponent implements OnInit {

	constructor(private router: Router,
		private assessmentService: AssessmentService, private storageService: StorageService) {}
	assessmentsData: any = {};
	user: any;
	totalUserHistory = [];
	isLoading = false;
	deviceHeight = 0;
	public screenWidth: any;
	public screenHeight: any;
	public headerHeight = 65;
	public footerHeight = 161;
	public bodyHeight = 0;
	ngOnInit(): void {
		this.screenWidth = window.innerWidth;
      	this.screenHeight = window.innerHeight;
		this.deviceHeight = this.screenHeight - this.headerHeight - this.footerHeight; //window.innerHeight;
		this.bodyHeight = this.screenHeight - (2*this.headerHeight) - this.footerHeight;
		this.bodyHeight = this.screenHeight - (2*this.headerHeight) - this.footerHeight;
		const currentUser =  this.storageService.getCurrentUser();
		// console.log(JSON.stringify(currentUser))
		if (currentUser) {
			this.user = currentUser;
		}
		this.assessmentsData = [];
		this.assessmentService.selectedTest = {};
		// this.testSecurityApi();
		this.getAllAssessments(this.user.id);
	}

	testSecurityApi() {
		this.assessmentService.testSecurityAPI().subscribe(result => {
			// console.log(result);
		});
	}
	getAllAssessments(id:number) {
		this.isLoading = true;
		this.assessmentService.getAssessments(id).subscribe(result => {
			// console.log(result.data)
			this.assessmentsData = result.data;
			this.isLoading = false;

			// this.assessmentsData.forEach(element => {
			// 	element.finishedOn = "";
			// });
		})
	}


	navigateToDetails(item:any) {
		this.router.navigate(['/assessments/details', ]);
		this.assessmentService.selectedTest = item;
		const tempHistory = [...[], ...this.totalUserHistory];
		let assessmentHistory: any = [];
		assessmentHistory = tempHistory.filter((asmnt:any) => String(asmnt.id) === String(item.id));
		this.assessmentService.selectedTest.history = [...[], ...assessmentHistory];
	}






}