import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MoodTrackerService } from 'src/app/services/mood-tracker.service';
import {
  ChartType
} from 'angular-google-charts';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.css']
})
export class MoodTrackerComponent implements OnInit {

  constructor(private moodTrackerService: MoodTrackerService, private router: Router, private storageService: StorageService) {
    
  }

  selectedOptionInd = 0;
  title = '';
  type =  ChartType.PieChart;
  totalMoodCount = 0;
  buttonsInfo = ['7 Days', '1 Month', '1 Year', 'Till Date'];
  pleasentPercentage = 0;
  unpleasentPercentage = 0;
  moodTrackerData = [];
  display = 'none';
  thoughtModaldisplay = 'none';
  resultData = [];
  columnNames = [
    'Browser',
    'Percentage',
    { role: 'tooltip', type: 'string', p: { html: true } },
  ];

  selectedThought = '';
  thoughtsInfo = {
    T1: 'Me Myself',
    T2: 'Friends and Family',
    T3: 'Community & Others',
  };
  public selectedSlice: any = [];
  public selectedSliceThoughts: Array<[thoughtNamePercentage: string, percentage: number, thoughtName: string]> = new Array();
  thoughtsPercentages = {
    t1: 0,
    t2: 0,
    t3: 0,
  };
  M1 = [] as any;
  M2 = [] as any;
  M3 = [] as any;
  M4 = [] as any;
  M5 = [] as any;
  M6 = [] as any;
  M7 = [] as any;
  M8 = [] as any;
  M1Percentage = 5;
  M2Percentage = 10;
  M3Percentage = 15;
  M4Percentage = 20;
  M5Percentage = 25;
  M6Percentage = 30;
  M7Percentage = 35;
  M8Percentage = 40;
  M1MoodName = 'Resilience - ' + this.M1Percentage + '%';
  M2MoodName = 'Wonder - ' + this.M2Percentage + '%';
  M3MoodName = 'Joy - ' + this.M3Percentage + '%';
  M4MoodName = 'Love - ' + this.M4Percentage + '%';
  M5MoodName = 'Disgust - ' + this.M5Percentage + '%';
  M6MoodName = 'Depression & Sadness - ' + this.M6Percentage + '%';
  M7MoodName = 'Anxiety & Fear - ' + this.M7Percentage + '%';
  M8MoodName = 'Anger - ' + this.M8Percentage + '%';
  moodsColors : Array<string> = [
    '#FEA500',
    '#CBD109',
    '#FFD700',
    '#2DB12D',
    '#1870C5',
    '#7228bc',
    '#D36BD3',
    '#FE0000',
  ];
  moodNames = [
    'M1MoodName',
    'M2MoodName',
    'M3MoodName',
    'M4MoodName',
    'M5MoodName',
    'M6MoodName',
    'M7MoodName',
    'M8MoodName',
  ];

  data : Array<[moodName: string, percentage: number, label: string]> = new Array();
  isDataAvailable: boolean = true;
  moodThoughtsData: Array<[moodName: string, percentage: number, label: string]> = new Array();
  mood_options_web = {
    legend: { position: 'left' },
    pieHole: 0,
    // pieSliceText: 'label',
    is3D: false,
    width: 500,
    height: 500,
    sliceVisibilityThreshold: 0,
    pieSliceTextStyle: {
      fontSize: 9,
    },
    colors: this.moodsColors,
    tooltip: { isHtml: true },
  };
  mood_options_mobile = {
    legend: { position: 'bottom', alignment: 'end' },
    pieHole: 0,
    // pieSliceText: 'label',
    is3D: false,
    width: 300,
    height: 300,
    sliceVisibilityThreshold: 0,
    pieSliceTextStyle: {
      fontSize: 9,
    },
    colors: this.moodsColors,
    tooltip: { isHtml: true },
  };
  thoughtsOptions = {
    legend: { position: 'right' },
    pieHole: 0,
    // pieSliceText: 'label',
    width: 400,
    height: 200,
    is3D: true,
    pieSliceTextStyle: {
      fontSize: 9,
    },
    tooltip: { isHtml: true },
    colors: ['#808000', '#00008B', '#800000'],

    // colors: ["#FEA500", "#FFFF01", "#FFE59E", "#90EE90", "#1E90FF", "#D3D3D3", "#D36BD3", "#FE0000" ]
  };
  moodsThoughtsOptions = {
    legend: { position: 'right' },
    pieHole: 0,
    // pieSliceText: 'label',
    width: 400,
    height: 200,
    is3D: true,
    pieSliceTextStyle: {
      fontSize: 9,
    },
    // sliceVisibilityThreshold: 0,
    colors: new Array(),
    tooltip: { isHtml: true },
  };
  width = 600;
  height = 600;

  columnType = ChartType.ColumnChart;// 'ColumnChart';
  ColumnThoughtsData : Array<[thoughtName: string, percentage: number, color: string, percentageValue: string]> = new Array();;
  columnThoughtNames = [
    'Element',
    'value',
    { role: 'style' },
    { role: 'tooltip', type: 'string', p: { html: true } },
  ];
  moodThoughtsColumnNames = [
    'Element',
    'value',
    { role: 'tooltip', type: 'string', p: { html: true } },
  ];

  thoughtOptions = {
    legend: { position: 'none' },
    series: {
      0: { color: '#808000' },
      1: { color: '#00008B' },
      2: { color: '#800000' },
    },
    tooltip: { isHtml: true },
    vAxis: {
      ticks: [
        { v: 0, f: '0%' },
        { v: 20, f: '20%' },
        { v: 40, f: '40%' },
        { v: 60, f: '60%' },
        { v: 80, f: '80%' },
        { v: 100, f: '100%' },
      ],
      gridlines: { color: '#dedede' },
      textStyle: { color: '#5f5f5f' },
      viewWindowMode: 'explicit',
      viewWindow: {
        min: 0,
        max: 100,
      },
    },
  };
  thoughtWidth = 300;
  thoughtHeight = 200;

  popupTitle = [
    { index: 0, title: 'Add Feeling' },
    { index: 1, title: 'Add Emotion' },
    { index: 2, title: 'Type Of Thought' },
  ];
  addFeelingIndex = 0;
  moodsTypes = ['UNPLEASENT', 'PLEASENT'];
  isPleasent = false;
  selectedEmotion: string = '';
  deviceWidth: number = 0;
  deviceHeight: number = 0;
  ngOnInit(): void {
    this.deviceWidth = window.screen.width;
    this.deviceHeight = window.screen.height;
    this.getData();
    this.getUsersMoodsData();
  }
  getUsersMoodsData() {
    // this.moodTrackerService.getUserMoodsData().subscribe(result => {
    // 	console.log(result);
    // })
  }
  resetChartData() {
    this.M1 = [];
    this.M2 = [];
    this.M3 = [];
    this.M4 = [];
    this.M5 = [];
    this.M6 = [];
    this.M7 = [];
    this.M8 = [];
    this.M1MoodName = 'Resilience';
    this.M2MoodName = 'Wonder';
    this.M3MoodName = 'Joy';
    this.M4MoodName = 'Love';
    this.M5MoodName = 'Disgust';
    this.M6MoodName = 'Depression & Sadness';
    this.M7MoodName = 'Anxiety & Fear';
    this.M8MoodName = 'Anger';
  }
  getData() {
    let fromDate: any = new Date();
    let toDate = new Date();
    if (this.selectedOptionInd === 0) {
      fromDate = fromDate.setDate(fromDate.getDate() - 7);
    }
    if (this.selectedOptionInd === 1) {
      fromDate = fromDate.setDate(fromDate.getDate() - 30);
    }
    if (this.selectedOptionInd === 2) {
      fromDate = fromDate.setDate(fromDate.getDate() - 365);
    }
    if (this.selectedOptionInd === 3) {
      fromDate = fromDate.setDate(fromDate.getDate() - 1825);
    }
    const currentUser = this.storageService.getCurrentUser();
    const payLoad = {
      userId: currentUser.id,
      fromDate: new Date(fromDate),
      toDate: toDate,
    };
    this.moodTrackerService.getUserMoodsData(payLoad).subscribe((result) => {
      // console.log(result.data)
      this.resetChartData();
      this.totalMoodCount = result.data.length;
      this.isDataAvailable = this.totalMoodCount > 0 ? true : false;
      this.resultData = result.data;
      result.data.forEach((element: any) => {
        this.pushData(element.mood_type, element);
      });
      this.setMoodNameWithPercentage();
      if (result.data.length > 0) {
        this.setPleasentUnPleasentBarData(result.data);
        this.data = [
          [this.M1MoodName,  this.getPercentageValue2(this.M1, this.totalMoodCount), this.getMoodDataLabel(this.M1MoodName)],
          [this.M2MoodName,  this.getPercentageValue2(this.M2, this.totalMoodCount), this.getMoodDataLabel(this.M2MoodName)],
          [this.M3MoodName,  this.getPercentageValue2(this.M3, this.totalMoodCount), this.getMoodDataLabel(this.M3MoodName)],
          [this.M4MoodName,  this.getPercentageValue2(this.M4, this.totalMoodCount), this.getMoodDataLabel(this.M4MoodName)],
          [this.M5MoodName,  this.getPercentageValue2(this.M5, this.totalMoodCount), this.getMoodDataLabel(this.M5MoodName)],
          [this.M6MoodName,  this.getPercentageValue2(this.M6, this.totalMoodCount), this.getMoodDataLabel(this.M6MoodName)],
          [this.M7MoodName,  this.getPercentageValue2(this.M7, this.totalMoodCount), this.getMoodDataLabel(this.M7MoodName)],
          [this.M8MoodName,  this.getPercentageValue2(this.M8, this.totalMoodCount), this.getMoodDataLabel(this.M8MoodName)]
        ];
      } else {
        this.unpleasentPercentage = 0;
        this.pleasentPercentage = 0;
        this.data = [];
        this.ColumnThoughtsData = [];
      }
    });
  }

  getMoodDataLabel(moodName: string) {
    return `<lablel class='p-2'>${moodName.slice(0, moodName.indexOf('-'))}</lablel>`;
  }

  getMoodNameWithPerentage(moodName: string, moodArray: []) {
    return moodName + ' - ' + this.getPercentageValue(moodArray, this.totalMoodCount);
  }

  setMoodNameWithPercentage() {
    this.M1MoodName = this.getMoodNameWithPerentage(this.M1MoodName, this.M1);
    this.M2MoodName = this.getMoodNameWithPerentage(this.M2MoodName, this.M2);
    this.M3MoodName = this.getMoodNameWithPerentage(this.M3MoodName, this.M3);
    this.M4MoodName = this.getMoodNameWithPerentage(this.M4MoodName, this.M4);
    this.M5MoodName = this.getMoodNameWithPerentage(this.M5MoodName, this.M5);
    this.M6MoodName = this.getMoodNameWithPerentage(this.M6MoodName, this.M6);
    this.M7MoodName = this.getMoodNameWithPerentage(this.M7MoodName, this.M7);
    this.M8MoodName = this.getMoodNameWithPerentage(this.M8MoodName, this.M8);
    //   this.M1MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M1, this.totalMoodCount); //((this.M1.length / this.totalMoodCount) * 100).toFixed(2) + "%";
    // this.M2MoodName =
    //   this.M2MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M2, this.totalMoodCount);
    // this.M3MoodName =
    //   this.M3MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M3, this.totalMoodCount);
    // this.M4MoodName =
    //   this.M4MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M4, this.totalMoodCount);
    // this.M5MoodName =
    //   this.M5MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M5, this.totalMoodCount);
    // this.M6MoodName =
    //   this.M6MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M6, this.totalMoodCount);
    // this.M7MoodName =
    //   this.M7MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M7, this.totalMoodCount);
    // this.M8MoodName =
    //   this.M8MoodName +
    //   ' - ' +
    //   this.getPercentageValue(this.M8, this.totalMoodCount);
  }

  getPercentageValue(moodArray: any, totalCount: number) {
    return totalCount > 0
      ? Number(((moodArray.length / totalCount) * 100).toFixed(0)) + '%'
      : 0 + '%';
  }

  getPercentageValue2(moodArray: any, totalCount: number) {
    let percentage = Number((moodArray.length / totalCount) * 100); //.toFixed(0));
    percentage = Number(percentage.toFixed(0));
    return totalCount > 0 ? Math.round(percentage) : 0;
  }

  setPleasentUnPleasentBarData(data:any) {
    const pleasentLength =
      this.M1.length + this.M2.length + this.M3.length + this.M4.length;
    const unpleasentLength =
      this.M5.length + this.M6.length + this.M7.length + this.M8.length;
    this.pleasentPercentage = Number(
      ((pleasentLength / this.totalMoodCount) * 100).toFixed(2)
    );
    this.unpleasentPercentage = Number(
      ((unpleasentLength / this.totalMoodCount) * 100).toFixed(2)
    );
    const dummyData = [...[], ...data];
    const t1Data = dummyData.filter((item) => item.thought_type === 'T1');
    const t2Data = dummyData.filter((item) => item.thought_type === 'T2');
    const t3Data = dummyData.filter((item) => item.thought_type === 'T3');

    this.thoughtsPercentages.t1 = Number(
      ((t1Data.length / this.totalMoodCount) * 100).toFixed(0)
    );
    this.thoughtsPercentages.t2 = Number(
      ((t2Data.length / this.totalMoodCount) * 100).toFixed(0)
    );
    this.thoughtsPercentages.t3 = Number(
      ((t3Data.length / this.totalMoodCount) * 100).toFixed(0)
    );
    this.ColumnThoughtsData = [
      [
        'Me & MySelf',
        this.thoughtsPercentages.t1,
        'color: #808000',
        this.thoughtsPercentages.t1 + '%',
      ],
      [
        'Family & Friends',
        this.thoughtsPercentages.t2,
        'color: #00008B',
        this.thoughtsPercentages.t2 + '%',
      ],
      [
        'Community & Others',
        this.thoughtsPercentages.t3,
        'color: #800000',
        this.thoughtsPercentages.t3 + '%',
      ],
    ];
  }

  getFixedFloat(number: number) {
    if (number > 0) {
      number = Number(number.toFixed(2));
    } 
    return number;
  }

  pushData(moodType: string, element: any) {
    switch (moodType) {
      case 'M1':
        this.M1MoodName = element.moodName;
        this.M1.push(element);
        break;
      case 'M2':
        this.M2MoodName = element.moodName;
        this.M2.push(element);
        break;
      case 'M3':
        this.M3MoodName = element.moodName;
        this.M3.push(element);
        break;
      case 'M4':
        this.M4MoodName = element.moodName;
        this.M4.push(element);
        break;
      case 'M5':
        this.M5MoodName = element.moodName;
        this.M5.push(element);
        break;
      case 'M6':
        this.M6MoodName = element.moodName;
        this.M6.push(element);
        break;
      case 'M7':
        this.M7MoodName = element.moodName;
        this.M7.push(element);
        break;
      case 'M8':
        this.M8MoodName = element.moodName;
        this.M8.push(element);
        break;
      default:
        break;
    }
  }
  openThougtsChartPopup(event: any) {
    this.display = 'block';
    const selectedItem = this.data[event.selection[0].row];
    this.selectedSlice = this.resultData.filter((item: any) =>
      selectedItem[0].includes(item.moodName)
    );
    // const item = [['Me Myself',0],['Friends and Family',0],['Community',0]]
    const t1 = this.selectedSlice.filter((item: any) => item.thought_type === 'T1');
    const t2 = this.selectedSlice.filter((item: any) => item.thought_type === 'T2');
    const t3 = this.selectedSlice.filter((item: any) => item.thought_type === 'T3');
    this.selectedSliceThoughts = [
      [
        'Me Myself - ' +
          ((t1.length / this.selectedSlice.length) * 100).toFixed(0) +
          '%',
        (t1.length / this.selectedSlice.length) * 100,
        'Me Myself',
      ],
      [
        'Friends and Family - ' +
          ((t2.length / this.selectedSlice.length) * 100).toFixed(0) +
          '%',
        (t2.length / this.selectedSlice.length) * 100,
        'Friends and Family',
      ],
      [
        'Community - ' +
          ((t3.length / this.selectedSlice.length) * 100).toFixed(0) +
          '%',
        (t3.length / this.selectedSlice.length) * 100,
        'Community',
      ],
    ];
  }
  onCloseHandled() {
    this.display = 'none';
  }
  thoughtsClick(thought: any) {
    thought = 'T' + (Number(thought?.selection[0].row) + 1);

    this.selectedThought = JSON.parse(JSON.stringify(this.thoughtsInfo))[thought];
    this.thoughtModaldisplay = 'block';
    const data = this.resultData.filter(
      (item: any) => item.thought_type === thought
    );
    let modesData: any = {};
    data.forEach((element: any) => {
      modesData[element.mood_type] = modesData[element.mood_type] == undefined ? [] : modesData[element.mood_type];
      modesData[element.mood_type].push(element);
    });
    this.moodThoughtsData = [];
    let totalCount = 0;
    this.moodsThoughtsOptions.colors = new Array();

    for (let key in modesData) {
      totalCount = totalCount + modesData[key].length;
    }
    const moodNumbers: any = [];
    for (let key in modesData) {
      let val = Number(key.slice(1, 2));
      moodNumbers.push(val);
      this.moodsThoughtsOptions.colors.push(this.moodsColors[Number(val - 1)]);
      this.moodThoughtsData.push(
        [
          modesData[key][0].moodName + ' - ' + ((modesData[key].length / totalCount) * 100).toFixed(0) + '%',
          Number(((modesData[key].length / totalCount) * 100).toFixed(0)),
          modesData[key][0].moodName,
      ]);
    }
  }
  thoughtClose() {
    this.thoughtModaldisplay = 'none';
  }

  setMaxValue(data: any) {
    let max = 0;
    let item: any = [];
    data.forEach((element: any) => {
      if (max <= element[1]) {
        max = element[1];
        item = element;
      }
    });
    return item[0];
  }

  setMinValue(data: any) {
    let min = data[0][1];
    let item = data[0];
    data.forEach((element: any) => {
      if (min >= element[1]) {
        min = element[1];
        item = element;
      }
    });
    return item[0];
  }

  // Add feeling popup pages
  pleasentUnPleasentValue = '';
  thoughtsValue = "";
  @ViewChild('closeIcon') private closeIcon!: ElementRef;


  unpleasantEmotions = [
    {
      index: 0,
      id: 'mood1',
      code: 'M8',
      title: 'Angry',
      image: 'assets/img/m1.png',
      synonyms: ['Furious', 'Resentment', 'Envy', 'Annoyed'],
    },
    {
      index: 1,
      id: 'mood2',
      code: 'M7',
      title: 'Anxiety & Fear',
      image: 'assets/img/m2.png',
      synonyms: ['Terrified', 'Afraid', 'Worried', 'Concerned'],
    },
    {
      index: 2,
      id: 'mood3',
      code: 'M5',
      title: 'Disgust',
      image: 'assets/img/m3.png',
      synonyms: ['Hateful', 'Self Pity', 'Embarrassed', 'Guilty'],
    },
    {
      index: 3,
      id: 'mood4',
      code: 'M6',
      title: 'Depression & Sad',
      image: 'assets/img/m4.png',
      synonyms: ['Grieved', 'Hopeless', 'Dejected', 'Unhappy'],
    },
  ];

  thoughtsData = [
    {
      index: 0,
      id: 'thought1',
      code: 'T1',
      title: 'Thoughts is related to - I, Me & Myself',
      images: [
        { name: 'My Ego', src: 'assets/img/ic1.png' },
        { name: 'My Belongings', src: 'assets/img/ic2.png' },
        { name: 'My Career', src: 'assets/img/ic3.png' },
        { name: 'My Health', src: 'assets/img/ic4.png' },
		{ name: 'My Achievements', src: 'assets/img/ic5.png' },
		{ name: 'My Finances', src: 'assets/img/ic6.png' },
		{ name: 'My Feelings', src: 'assets/img/ic7.png' },
		{ name: 'My Comfort', src: 'assets/img/ic8.png' },
		{ name: 'My Image', src: 'assets/img/ic9.png' }
      ]
    },
	{
		index: 1,
		id: 'thought2',
		code: 'T2',
		title: 'Thought is related to Family, Friends & Colleagues',
		images: [
		  { name: 'Partner', src: 'assets/img/ic10.png' },
		  { name: 'Siblings', src: 'assets/img/ic11.png' },
		  { name: 'Colleagues', src: 'assets/img/ic12.png' },
		  { name: 'Kids', src: 'assets/img/ic13.png' },
		  { name: 'Relationships', src: 'assets/img/ic14.png' },
		  { name: 'Classmates', src: 'assets/img/ic15.png' },
		  { name: 'Parents', src: 'assets/img/ic16.png' },
		  { name: 'Friends', src: 'assets/img/ic17.png' },
		  { name: 'Competitors', src: 'assets/img/ic18.png' }
		],
	  },
	  {
		index: 0,
		id: 'thought3',
		code: 'T3',
		title: 'Thoughts is related to Community, Society & Public',
		images: [
		  { name: 'Neighbours', src: 'assets/img/ic19.png' },
		  { name: 'Social Issues', src: 'assets/img/ic20.png' },
		  { name: 'Public Health', src: 'assets/img/ic21.png' },
		  { name: 'Community welfare', src: 'assets/img/ic22.png' },
		  { name: 'Society Needs', src: 'assets/img/ic23.png' },
		  { name: 'Environmental issues', src: 'assets/img/ic24.png' },
		  { name: 'Community Problems', src: 'assets/img/ic25.png' },
		  { name: 'Social Service', src: 'assets/img/ic26.png' },
		  { name: 'Global Issues', src: 'assets/img/ic27.png' }
		],
	  },
  ];
  pleasantEmotions = [
    {
      index: 0,
      id: 'mood1',
      code: 'M3',
      title: 'Happiness',
      image: 'assets/img/hap1.png',
      synonyms: ['Euphoria', 'Elated', 'Joyful', 'Glad'],
    },
    {
      index: 1,
      id: 'mood2',
      code: 'M4',
      title: 'Love',
      image: 'assets/img/hap2.png',
      synonyms: ['Passionate', 'Attached', 'Affection', 'Compassion'],
    },
    {
      index: 2,
      id: 'mood3',
      code: 'M1',
      title: 'Resilience',
      image: 'assets/img/hap3.png',
      synonyms: ['Fearless', 'Arrogant', 'Brave', 'Pride'],
    },
    {
      index: 3,
      id: 'mood4',
      code: 'M2',
      title: 'Wonder',
      image: 'assets/img/hap4.png',
      synonyms: ['Amazed', 'Surprized', 'Curious', 'Excited'],
    },
  ];

  pleasentUnPleasentCheck(e:  any, emotion: any) {
    this.pleasentUnPleasentValue = e.target.checked === true ? e.target.value : '';
	  this.selectedEmotion = emotion.title;
  }

  thoughtsCheck(e: any) {
    this.thoughtsValue = e.target.checked === true ? e.target.value : '';
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
    this.moodTrackerService.saveMoodsData(payLoad).subscribe(result => { 
	  this.pleasentUnPleasentValue = "";
	  this.thoughtsValue = "";
	  this.selectedEmotion = "";
	  this.closeIcon.nativeElement.click();

    //   this.router.navigate(['/moodtracker']);
	    this.getData();

    })
  }

}
