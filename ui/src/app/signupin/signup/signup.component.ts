import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import { mergeMap } from 'rxjs/operators';
import { SessionStorage } from '../../app.session';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: any = '';
  registerForm: FormGroup;
  pwd1: any = '';
  pwd2: any = '';
  submitted = false;
  allusers: any;
  isUserexisting: any = undefined;
  loading = false;
  Premium = false;
  currentPassword: any;
  @Output() userdata = new EventEmitter<{username: string, password: string}>();

  constructor(private http: HttpClient, private Authserviceclient: AuthService, private sessionKey: SessionStorage) {}

  onSubmit(f: NgForm) {
      if (f.value.password !== f.value.cpassword) {
        window.alert('Password Doesnt Match, please try again');
        return;
      }

      this.loading = true;
      this.Premium = f.value.isPremium;
      this.currentPassword = f.value.cpassword;
      this.Authserviceclient.signup(f.value.email, f.value.password, f.value.isPremium).subscribe(result => {
          // result = this.isUserexisting;
          // console.log('FROM BASE', result);
          // this.loading = false;
          // console.log('CHECK FLOW_1:', this.currentPassword);
          if (!result.available) {
              // this.isUserexisting = result;
              this.Authserviceclient.register(result.username, this.currentPassword, this.Premium).subscribe(res => {
                // console.log('FROM BASE 2', res);
                this.loading = false;
                if (res.registered) {
                  // console.log('CHECK FLOW_2:', this.currentPassword);
                  this.sessionKey.setKey(res.token, res.username);
                  this.userdata.emit({username: res.username, password: this.currentPassword});
                } else {
                  window.alert('Some problem with registering, try again later!!!');
                  this.loading = false;
                  return;
                }
              });
                } else {
                  window.alert('USERNAME already present, choose other name');
                  this.loading = false;
                  return;
                        }
              });

}

}
