import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-session-play-icon',
  templateUrl: './session-play-icon.component.html',
  styleUrls: ['./session-play-icon.component.css']
})
export class SessionPlayIconComponent implements OnInit {
 
    @Input() sessionStatus!: string;
    @Input() sessionCanPlay!: boolean;
    
    constructor() { }

    ngOnInit(): void {
      
    }


}
