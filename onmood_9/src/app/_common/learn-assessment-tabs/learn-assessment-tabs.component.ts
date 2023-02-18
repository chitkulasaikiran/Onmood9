import { Component, OnInit, Input, Output, } from '@angular/core';

@Component({
  selector: 'app-learn-assessment-tabs',
  templateUrl: './learn-assessment-tabs.component.html',
  styleUrls: ['./learn-assessment-tabs.component.css']
})
export class LearnAssessmentTabsComponent implements OnInit {
  @Input() activeIndex: number = 0;

  learnTabs = [{index: 0, name: "Courses", isActive: true, link: "/onmood-course/1/courses"},{index: 1, name: "Assess", isActive: false, link: "/assessments"}];
  constructor() { }

  ngOnInit(): void {
    // console.log(this.activeIndex);
    this.learnTabs.forEach(tab => {
      if(tab.index === this.activeIndex) {
        tab.isActive = true;
      } else {
        tab.isActive = false;
      }
    });
  }

}
