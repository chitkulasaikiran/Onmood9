import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoodTrackerService } from 'src/app/services/mood-tracker.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-feeling',
  templateUrl: './add-feeling.component.html',
  styleUrls: ['./add-feeling.component.css']
})
export class AddFeelingComponent implements OnInit {

  constructor(private moodTrackerService: MoodTrackerService, private router: Router,private storageService: StorageService) { }
  addFeelingIndex = -1;
  moodsTypes = ["UNPLEASENT", "PLEASENT"];
  isPleasent = false;
  ngOnInit(): void {
  }

  pleasentUnpleasentData = [[{
    title: 'Anger',
    name: 'anger',
    subTitles: ['Furious', 'Resentment', 'Envy', 'Annoyed'],
    image: './assets/anger.png',
    code: 'M8'
  },
  {
    title: 'Anxiety & Fear ',
    name: 'fear',
    subTitles: ['Terrified', 'Afraid', 'Afraid', 'Concerned'],
    image: './assets/fear.jpg',
    code: 'M7'
  },
  {
    title: 'Disgust',
    name: 'disgusted',
    subTitles: ['Hateful', 'Self Pity', 'Embarrassed', 'Guilty'],
    image: './assets/disgust.jpg',
    code: 'M5'
  }, {
    title: 'Depression & Sadness',
    name: 'sad',
    subTitles: ['Grieved', 'Hopeless', 'Dejected', 'Unhappy'],
    image: './assets/sad.jpg',
    code: 'M6'
  }],
  [{
    title: 'Joy',
    name: 'joy',
    subTitles: ['Euphoria', 'Elated', 'Joyful', 'Glad'],
    image: './assets/Joy new.jpg',
    code: 'M3'
  },
  {
    title: 'Love',
    name: 'love',
    subTitles: ['Passionate', 'Attached', 'Affection', 'Compassion'],
    image: './assets/Love.jpg',
    code: 'M4'

  },
  {
    title: 'Resilience',
    name: 'courage',
    subTitles: ['Fearless', 'Arrogant', 'Brave', 'Pride'],
    image: './assets/Courage.jpg',
    code: 'M1'

  }, {
    title: 'Wonder',
    name: 'wonder',
    subTitles: ['Amazed', 'Surprized', 'Curious', 'Excited'],
    image: './assets/wonder.png',
    code: 'M2'
  }]]
  setSelecteValue() {
    if (this.pleasentUnPleasentValue != '') {
      let selectedItem: any
      selectedItem = this.pleasentUnpleasentData[0].find((item: any) => item.code === this.pleasentUnPleasentValue);
      if (selectedItem === undefined) {
        selectedItem = this.pleasentUnpleasentData[1].find((item: any) => item.code === this.pleasentUnPleasentValue);
      }
      return selectedItem?.title;
    } else {
      return "";
    }
  }

  myThoughtsIcons = [{
    label: 'My Ego',
    icon: 'fa fa-circle'
  },
  {
    label: 'My Belongings',
    icon: 'fa fa-wallet'
  },
  {
    label: 'My Career',
    icon: 'fa fa-book-reader'
  },
  {
    label: 'My Health',
    icon: 'fa fa-plus'
  }, {
    label: 'My Achievements',
    icon: 'fa fa-medal'
  },
  {
    label: 'My Finances',
    icon: 'fa fa-money-bill'
  },

  {
    label: 'My Feelings',
    icon: 'fa fa-laugh-beam'
  },
  {
    label: 'My Comfort',
    icon: 'fa fa-hand-holding-heart'
  },
  {
    label: 'My Image',
    icon: 'fa fa-child'
  },
  ]


  familyThoughtsIcons = [{
    label: 'Partner',
    icon: 'fa fa-user-plus'
  },
  {
    label: 'Siblings',
    icon: 'fa fa-users'
  },
  {
    label: 'Colleagues',
    icon: 'fa fa-sitemap'
  },
  {
    label: 'Kids',
    icon: 'fa fa-child'
  },
  {
    label: 'Relationships',
    icon: 'fas fa-hand-holding-heart'
  },

  {
    label: 'Classmates',
    icon: 'fa fa-book'
  },
  {
    label: 'Parents',
    icon: 'fa fa-user-secret'
  },
  {
    label: 'Friends',
    icon: 'fa fa-users'
  },
  {
    label: 'Competitors',
    icon: 'fa fa-trophy'
  }
  ]

  publicThoughtsIcons = [{
    label: 'Neighbours',
    icon: 'fa fa-home'
  },
  {
    label: 'Social Issues',
    icon: 'fa fa-comments'
  },
  {
    label: 'Public',
    icon: 'fa fa-medkit'
  },
  {
    label: 'Community',
    icon: 'fa fa-hands'
  },
  {
    label: 'Society',
    icon: 'fa fa-building'
  },

  {
    label: 'Environment',
    icon: 'fab fa-envira'
  },
  {
    label: 'Others',
    icon: 'fa fa-sign-language'
  },
  {
    label: 'Unrelated to self',
    icon: 'fa fa-praying-hands'
  },
  {
    label: 'Global Issues',
    icon: 'fa fa-globe'
  }
  ]
  thoughtsValue = '';
  pleasentUnPleasentValue = '';
  thoughtsCheck(e: any) {
    this.thoughtsValue = e.target.checked === true ? e.target.value : '';
  }
  pleasentUnPleasentCheck(e: any) {
    this.pleasentUnPleasentValue = e.target.checked === true ? e.target.value : '';
  }

  save() {
    const currentUser = this.storageService.getCurrentUser();

    const payLoad = {
      'user_id': currentUser.id,
      'feel_type': this.isPleasent == true ? 'F1' : 'F2',
      'mood_type': this.pleasentUnPleasentValue,
      'thought_type': this.thoughtsValue,
      'added_on': new Date()
    }
    this.moodTrackerService.saveMoodsData(payLoad).subscribe((result: any) => {
      // console.log(result.data)
      console.log(result);
      this.router.navigate(['/moodtracker']);
    })
  }


}
