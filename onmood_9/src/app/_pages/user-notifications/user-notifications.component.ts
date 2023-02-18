import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.css']
})
export class UserNotificationsComponent implements OnInit {

  user!: User;
  notifications : Array<any> = [];
	deviceHeight = 0;
	public screenHeight: any;
  
  public headerHeight = 65;
	public footerHeight = 161;

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;

		this.deviceHeight = this.screenHeight - this.headerHeight - this.footerHeight; //window.innerHeight;

    const currentUser = this.storageService.getCurrentUser();
    if(currentUser) {
      this.user = currentUser;
      this.getUserNotifications();
    }
  }

  getUserNotifications(){
    this.userService.getUserNotifications(this.user.id).subscribe(response => {
      console.log(response);
      const JSONData = JSON.parse(JSON.stringify(response));
      if(JSONData['status'] === true) {
        this.notifications = JSONData['data'].reverse();
      }
    }) 
  }

}
