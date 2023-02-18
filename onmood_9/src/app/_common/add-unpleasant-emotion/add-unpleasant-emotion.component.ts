import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-unpleasant-emotion',
  templateUrl: './add-unpleasant-emotion.component.html',
  styleUrls: ['./add-unpleasant-emotion.component.css'],
})
export class AddUnpleasantEmotionComponent implements OnInit {
  unpleasantEmotions = [
    {
      index: 0,
	  id: "mood1",
	  code: 'M8',
      title: 'Angry',
      image: 'assets/img/m1.png',
      synonyms: ['Furious', 'Resentment', 'Envy', 'Annoyed'],
    },
    {
      index: 1,
	  id: "mood2",
	  code: 'M7',
      title: 'Anxiety & Fear',
      image: 'assets/img/m2.png',
      synonyms: ['Terrified', 'Afraid', 'Worried', 'Concerned'],
    },
    {
      index: 2,
	  id: "mood3",
	  code: 'M5',
      title: 'Disgust',
      image: 'assets/img/m3.png',
      synonyms: ['Hateful', 'Self Pity', 'Embarrassed', 'Guilty'],
    },
    {
      index: 3,
	  id: "mood4",
	  code: 'M6',
      title: 'Depression & Sad',
      image: 'assets/img/m4.png',
      synonyms: ['Grieved', 'Hopeless', 'Dejected', 'Unhappy'],
    },
  ];
	pleasentUnPleasentValue: any = "";
  constructor() {}

  ngOnInit(): void {}

  pleasentUnPleasentCheck(e:any) {
	this.pleasentUnPleasentValue = e.target.checked === true ? e.target.value : '';
  }

  gotoNext() {
	  // console.log("gotoNext() is called")
  }
}
