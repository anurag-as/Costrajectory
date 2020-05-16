import { Component, OnInit } from '@angular/core';
import { GlobalConfigsService } from '../../global-configs.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CountriesService } from './countries.service';
import { Profileservice } from './profiledata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usrname = '';
  email = '';
  dob: Date;
  gender = '';
  first_name = '';
  last_name = '';
  address = '';
  address2 = '';
  country = '';
  state = '';
  zip_code: number;
  AllCountries;
  cityInfo;
  stateInfo;
  originalData: any;
  edited = false;
  error = false;

  constructor(private Globals: GlobalConfigsService, private Route: Router, private cs: CountriesService, private proser: Profileservice) {
    this.usrname = Globals.GetUserName;
    this.getCountries();
    this.proser.GetData(this.usrname).subscribe( data => {
      this.originalData = data;
      this.MapForForm(this.originalData);
      // console.log('GETTING USER INFO SUCCESSFUL:', data);
    }, err => {
      // console.log('GETTING USER INFO UNSUCCESSFUL');
    }
    );
  }

  ngOnInit() {
  }

  MapForForm(JSONdata) {
    // console.log('TEST: ', JSONdata.body.address);
    this.email = JSONdata.body.email;
    this.dob = JSONdata.body.dob;
    this.gender = JSONdata.body.gender;
    this.first_name = JSONdata.body.first_name;
    this.last_name = JSONdata.body.last_name;
    this.address = JSONdata.body.address;
    this.address2 = JSONdata.body.address2;
    this.country = JSONdata.body.country;
    this.state = JSONdata.body.state;
    this.zip_code = JSONdata.body.zip_code;
  }

  getCountries() {
    this.cs.allCountries().
    subscribe(
      data2 => {
        this.AllCountries = data2.Countries;
        // console.log('Data:', this.AllCountries);
      },
      err => {}
      // () => console.log('complete')
    );
  }

  GoHome() {
    this.Route.navigate(['']);
  }

  submit(form: NgForm) {
    this.saveTodos();
    this.edited = true;
    this.proser.SetData(this.usrname, form).subscribe( data => {
      // console.log('DATA UPLOADED SUCCESSFULLY');
    }, err => {
      this.error = true;
    });
  }

  reset(form: NgForm) {
     // form.resetForm();
    // this.usrname = this.Globals.GetUserName;
     form.resetForm({
      username : this.usrname,
      email : this.originalData.email,
      dob : this.originalData.dob,
      gender : this.originalData.gender,
      first_name: this.originalData.first_name,
      last_name: this.originalData.last_name,
      address : this.originalData.address,
      address2 : this.originalData.address2,
      country : this.originalData.country,
      state : this.originalData.state,
      zip_code : this.originalData.zip_code,
     });
    }

    onChangeCountry(countryValue) {
      this.stateInfo = this.AllCountries[countryValue].States;
    }

    saveTodos(): void {
      // show box msg
      this.edited = true;
      // wait 3 Seconds and hide
      setTimeout(function() {
          this.edited = false;
          this.error = false;
          // console.log(this.edited);
      }.bind(this), 6000);
     }

}
