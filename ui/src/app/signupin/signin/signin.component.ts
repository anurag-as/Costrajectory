import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import {AuthService} from './signinauth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  registerForm: FormGroup;
  @Output() userdata = new EventEmitter<{username: string, password: string}>();
  submitted = false;
  constructor(private formBuilder: FormBuilder , private http: HttpClient, private Authserviceclient: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }

  this.Authserviceclient.signin(this.registerForm.value.email, this.registerForm.value.password).subscribe(result => {
    if(result.valid === 'User successfully authenticated') {
      this.userdata.emit({username: this.registerForm.value.email, password: this.registerForm.value.password});
    } else if(result.valid === 'User does not exist') {
      window.alert('No record of such username, please register');
      return ;
    } else if(result.valid === 'Incorrect password, please try again') {
      window.alert('Incorrect username or password');
      return ;
    } else {
      window.alert('SORRY!!! Some error has occured, please try again');
      return ;
    }
    
  })
    
  
}

}
