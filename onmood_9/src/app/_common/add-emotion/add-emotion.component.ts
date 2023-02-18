import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-emotion',
  templateUrl: './add-emotion.component.html',
  styleUrls: ['./add-emotion.component.css']
})
export class AddEmotionComponent implements OnInit {
 
    pleasantEmotions = [
      {index: 0,id: "mood1", code: 'M3', title: "Happy", image: "assets/img/hap1.png", synonyms: ["Euphoria", "Elated","Joyful","Glad"]},
      {index: 1,id: "mood2",code: 'M4', title: "Loving",image: "assets/img/hap2.png", synonyms: ["Passionate", "Attached","Affection","Compassion"]},
      {index: 2,id: "mood3",code: 'M1', title: "Resilience",image: "assets/img/hap3.png", synonyms: ["Fearless", "Arrogant","Brave","Pride"]},
      {index: 3,id: "mood4",code: 'M2', title: "Wonder",image: "assets/img/hap4.png", synonyms: ["Amazed", "Surprized","Curious","Excited"]}
    ];

    pleasentUnPleasentValue: any = "";
    constructor() { }

    ngOnInit(): void {

    }

    pleasentUnPleasentCheck(e: any) {
      this.pleasentUnPleasentValue = e.target.checked === true ? e.target.value : '';
    }

    gotoNext() {
      // console.log("gotoNext() is called")
    }

}
