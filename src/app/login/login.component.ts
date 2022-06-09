import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SteamBackendServiceService } from '../services/steam-backend-service.service';
import { SubmissionType } from './submissiontype';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginStatus = false;
  valueChanged = false;
  infoText: String;
  submissionType = SubmissionType;

  loginForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private steamBackendService: SteamBackendServiceService) { 
      this.infoText ='';
    }

  ngOnInit(): void {
  }

  isFieldValid(field: string) {
    let fieldObj = this.loginForm.get(field);
    return fieldObj != null ? !fieldObj.valid && fieldObj.touched : false;
    
  }

  onSubmit(st: SubmissionType): void {
    switch(st){
      case SubmissionType.login:
        this.login();
        break;
      case SubmissionType.register:
        this.register();
        break;
    }
  }

  login(): void{
    let result = this.steamBackendService.getData('user/'+this.loginForm.value.username+'/'+this.loginForm.value.password);
    result.subscribe(data => {
      console.log('Response: ',data);
      this.loginStatus = data;
      this.valueChanged = true;
      this.infoText = this.loginStatus? 'Logged in successfully!' : 'Username and/ or Password wrong!';
    });
  }

  register(): void{
    console.log('Fired register function');
    let result = this.steamBackendService.postData('user/'+this.loginForm.value.username+'/'+this.loginForm.value.password, null);
    result.subscribe((data) => {
      this.valueChanged = true;
      this.loginStatus = true;
      this.infoText = 'User created successfully!'
    },
    (error) => {
      console.log(error.status);
      this.valueChanged = true;
      this.loginStatus = false;
      this.infoText = 'Username taken!'
    })
  }

}
