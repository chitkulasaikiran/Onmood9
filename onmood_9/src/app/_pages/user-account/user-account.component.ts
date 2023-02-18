import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CURRENT_USER } from 'src/app/constants/Constants';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  screenHeight: number = 0;
  screenWidth: number = 0;
  showLoader: boolean = false;
  showMessage: string = "";
  showPasswordMessage: string = "";
  isMessageEmpty: boolean = true;
  isEditingPersonalInfo: boolean = false;
  isChangingPassword: boolean = false;
  isPasswordMessageEmpty: boolean = true;
  cpwd: string = "*************";
  user!: User;
  personalInfoForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private authenticationService: AuthenticationService,
    private storageService: StorageService) {
      this.getScreenSize();
    }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    const currentUser = this.storageService.getCurrentUser(); 
    if(currentUser) {
      this.user = currentUser;
      this.setupPersonalInfoForm();
      this.setupPasswordForm();

      this.getMySubscriptions();
    }
  }

  setupPersonalInfoForm() {
    this.personalInfoForm = this.formBuilder.group({
      fname: [{value: this.user.fname, disabled: true}, Validators.required],
      contact: [{value: this.user.contact, disabled: true}, Validators.required],
      email: [{value: this.user.email, disabled: true}, [Validators.required, Validators.email]],
    });
  }

  setupPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      cpwd: [{value: '', disabled: true}, Validators.required],
      npwd: [{value: '', disabled: true}, Validators.required],
      rtpwd: [{value: '', disabled: true}, Validators.required],
      email: [{value: this.user.email, disabled: true}, [Validators.required, Validators.email]],
    });
  }

  editPersonalInfo(isEditing: boolean) {
    this.isEditingPersonalInfo = isEditing;
    if(isEditing) {
      this.personalInfoForm.controls['fname'].enable();
      this.personalInfoForm.controls['contact'].enable();
      // this.personalInfoForm.controls['email'].enable();
    } else {      
      this.personalInfoForm.controls['fname'].disable();
      this.personalInfoForm.controls['contact'].disable();
      this.personalInfoForm.controls['email'].disable();
    }
  }
  editPassword(isEditing: boolean) {
    this.isChangingPassword = isEditing;
    // if(!isEditing) { 
    //   // this.cpwd = "*************";
    //   this.setupPasswordForm();
    // } else {
    //   this.cpwd = "";
    // }
    if(isEditing) {
      this.passwordForm.controls['cpwd'].enable();
      this.passwordForm.controls['npwd'].enable();
      this.passwordForm.controls['rtpwd'].enable();
    } else {      
      this.passwordForm.controls['cpwd'].disable();
      this.passwordForm.controls['npwd'].disable();
      this.passwordForm.controls['rtpwd'].disable();
    }
  }

  updatePersonalInfo() {
    // stop here if form is invalid
    if (this.personalInfoForm.invalid) { 
        return;
    }
    this.showLoader = true;
    let input = {
      userId: this.user.id,
      fname: this.personalInfoForm.controls['fname'].value,
      contact: this.personalInfoForm.controls['contact'].value,
      email: this.personalInfoForm.controls['email'].value
    };
    this.userService.updatePersonalInfo(input)
    .subscribe(
        data => {
          this.showLoader = false;
            if(data['status'] === true) {
                this.showMessage = "Successfully updated";
                this.isMessageEmpty = false;
                this.isEditingPersonalInfo = false;
                this.editPersonalInfo(false);
                this.storageService.storeItem(CURRENT_USER, JSON.stringify(data['user']))
                // this.authenticationService.currentUserSubject.next(data['user']);

                setTimeout(()=> {
                  this.showMessage = "";
                  this.isMessageEmpty = true;
                }, 5000)
            }
        },
        error => {
          this.showLoader = false;
            console.log("error:", error);
        });
        
  }
  
  updatePasswordInfo() {
    let npwd = this.passwordForm.controls['npwd'].value;
    let rtpwd = this.passwordForm.controls['rtpwd'].value;
    if(npwd === '' || rtpwd === '') {
      alert('New Password or Retype password cannot be empty');
      return;
    }
    if(npwd === rtpwd) {
      this.showLoader = true;
      let input = {
        userId: this.user.id,
        email: this.user.email,
        cpwd: this.passwordForm.controls['cpwd'].value,
        npwd: this.passwordForm.controls['npwd'].value
      };
      this.userService.updateUserPassword(input)
      .subscribe(
        data => {
          this.showLoader = false;
            if(data['status'] === true) {
                this.showPasswordMessage = "Successfully updated";
                this.isPasswordMessageEmpty = false;
                this.isChangingPassword = false;

                setTimeout(()=> {
                  this.showPasswordMessage = "";
                  this.isPasswordMessageEmpty = true;
                  this.editPassword(false);
                }, 5000)
            } else {
              this.showPasswordMessage = data['message'];
              this.isPasswordMessageEmpty = false;
              setTimeout(()=> {
                  this.showPasswordMessage = "";
                  this.isPasswordMessageEmpty = true;
                }, 5000)
            }
        },
        error => {
          this.showLoader = false;
            console.log("error:", error);
        });
    } else {
      alert("New Password and Retype Password didnot match");
    }
  
  }


  getMySubscriptions() {
    this.userService.getMySubscriptions(this.user.id).subscribe(data => { 
    }, error => {
      console.log(error)
    });
  }

}
