import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  policies: Array<{sNo: number, title: string}>  = [];

  constructor() { }

  ngOnInit(): void {
    this.policies = [
      { sNo: 1, title: 'What Personal Information Do We Collect About You? '},
      { sNo: 2, title: 'Where/How Do We Collect Information About You?  '},
      { sNo: 3, title: 'How we use your Information'},
      { sNo: 4, title: 'With whom we share your information '},
      { sNo: 5, title: 'International data transfers'},
      { sNo: 6, title: 'Opting out of communications'},
      { sNo: 7, title: 'Third party websites'},
      { sNo: 7, title: 'Security and data retention'},
      { sNo: 7, title: 'Your rights'},
      { sNo: 7, title: 'Contact us'}
      
    ];
  }

}
