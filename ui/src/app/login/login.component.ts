import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any = '';
  registerForm: FormGroup;
  pwd1: any = '';
  pwd2: any = '';
  submitted = false;
  isUserexisting: any = false;
  constructor(private formBuilder: FormBuilder , private http: HttpClient) {}

  private MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.registerForm.controls; }

  private isUserexists( email: string ) {
    this.http.post('http://127.0.0.1:8000/checkUser', {username: email }).subscribe(posts => {
      this.isUserexisting = posts;
    });
  }

  private registerUser( email: string , enteredPassword: string) {
    this.http.post('http://127.0.0.1:8000/registerUser', {username: email , password: enteredPassword}).subscribe(posts => {
    });
  }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log('here');
        this.isUserexists( this.registerForm.value.email);
        console.log('here2');
        if (this.isUserexisting === true) {
          alert('Username alredy registered, please use another\n\n');
          return;
        }

        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
        this.registerUser(this.registerForm.value.email, this.registerForm.value.password);
          }


}
