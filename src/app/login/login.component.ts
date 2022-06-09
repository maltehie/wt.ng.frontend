import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SteamBackendServiceService } from '../services/steam-backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginStatus = false;
  valueChanged = false;
  infoText: String;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
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

  onSubmit(): void {
    let result = this.steamBackendService.getData('user/'+this.loginForm.value.username+'/'+this.loginForm.value.password);
    result.subscribe((data: any) => {
      console.log('Response: ',data);
      this.loginStatus = data;
      this.valueChanged = true;
      this.infoText = this.loginStatus? 'Logged in successfully!' : 'Username and/ or Password wrong!';
    });
  }

}
