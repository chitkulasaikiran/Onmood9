import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { MustMatch } from "./mustMatch";
import {Router} from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
  })
export class ForgotPasswordComponent implements OnInit {
  codeSendForm!: FormGroup;
  verifyCodeForm!: FormGroup;
  passwordResetForm!: FormGroup;
  codeSendFormSubmitted = false;
  verifyCodeFormSubmitted = false;
  resetPassowrdFormSubmitted = false;
  loading=false;
  userEmail: string = "";
  isResetCodeSent: boolean = false;
  isResetCodeVerified: boolean = false;
  isEmailRequired: boolean = false;
  errorResponseMessage: string = "";
  invalidCodeMessage: string = "";

  inserted_code_id: number = 0;
  showSuccessMessage: boolean = false;
  infoMessage: string = "";

  constructor(private router:Router,public formBuilder:FormBuilder, private userService: UserService) {

  }
  ngOnInit() {
    this.setupCodeSentForm();    
  }

  setupVerifyCodeForm() {
    this.verifyCodeForm = this.formBuilder.group({
      resetCode: ['',[Validators.required]]
    });
  }

  setupPasswordResetForm() {
    this.passwordResetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  setupCodeSentForm() {
    this.codeSendForm = this.formBuilder.group({
      email: [{value: '', disabled: this.showSuccessMessage}, [Validators.required, Validators.email]]
    });
  }
  resetErrorMessage() {
    this.errorResponseMessage = "";
  }

  get codeSendFormControls() { return this.codeSendForm['controls']; }
  get verifyCodeFormControls() { return this.verifyCodeForm.controls; }
  get passwordResetFormControls() { return this.passwordResetForm.controls; }
  
  
  sendCode(){
    this.codeSendFormSubmitted = true;
    if(this.codeSendForm.invalid) {
      // console.log("email is empty"+ JSON.stringify(this.codeSendFormControls['email'].errors))
      // this.isEmailRequired = this.codeSendFormControls['email'].errors['required'];
      return;
    }
    let email = this.codeSendFormControls['email'].value;
    this.userService.sendCode(email)
      .subscribe(
          data => {
              // console.log("data:", data);
              if(data['status'] === false) {
                this.errorResponseMessage = data['errorMessage'] 
              } else if(data['status'] === true) {
                // this.inserted_code_id = data['inserted_id'];
                // this.isResetCodeSent = true;
                // this.codeSendFormSubmitted = false;
                // this.userEmail = email;
                // this.setupVerifyCodeForm()
                this.showSuccessMessage = true;
                this.infoMessage = "Please check your email inbox for resetting your password";
              }
          },
          error => {
              console.log("error:", error);
          });
  }

  verifyCode() {
    this.verifyCodeFormSubmitted = true;
    if(this.verifyCodeForm.invalid) {
      // console.log("resetCode is empty"+ JSON.stringify(this.verifyCodeFormControls['resetCode']))
      // this.isEmailRequired = this.codeSendFormControls.email.errors.required;
      return;
    }
    this.userService.verifyCode(this.userEmail , this.verifyCodeFormControls['resetCode'].value, ""+this.inserted_code_id)
      .subscribe(
          data => {
              // console.log("data:", data);
              if(data['status'] === false) {
                this.invalidCodeMessage = data['errorMessage'] 
              } else if(data['status'] === true) {
                // this.setupPasswordResetForm();
                this.isResetCodeVerified = true;
                this.verifyCodeFormSubmitted = false;
                this.setupPasswordResetForm()
              }
          },
          error => {
              console.log("error:", error);
          });
  }

  resetPassowrd() {
    this.resetPassowrdFormSubmitted = true;
    // this.userService.updateUserPassword(this.)
  }

  onSubmit() {
    //  this.submitted = true;
    // // return for here if form is invalid
    // if (this.forgotPasswordForm.invalid) {
    //   return;
    // }
    // this.loading = true;
    // let formData:any = {
    //   email:this.forgotPasswordForm.value.email,
    //   pwd:this.forgotPasswordForm.value.password, 
    //   fullname:this.forgotPasswordForm.value.fullName
    // }
    // if (this.forgotPasswordForm.invalid) { return; }
    // this.loading = true;
    // this.userService.register(formData).subscribe((data) => {
    //   alert('User Registered successfully!!');
    //   this.router.navigate(['/signin']);
    // },(error)=>{
    //   this.loading = false;
    // });
  }
}
