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
  alternateEmail = '';
  DOB: Date;
  Gender = '';
  Fname = '';
  Lname = '';
  Addr1 = '';
  Addr2 = '';
  Country = '';
  State = '';
  Zip: number;
  AllCountries;
  cityInfo;
  stateInfo;
  originalData: any;

  constructor(private Globals: GlobalConfigsService, private Route: Router, private cs: CountriesService, private proser: Profileservice) {
    this.usrname = Globals.GetUserName;
  }

  ngOnInit() {
    this.getCountries();
    this.proser.GetData(this.usrname).subscribe( data => {
      this.originalData = data;
      this.MapForForm(this.originalData);
    }, err => {
      console.log('GETTING USER INFO UNSUCCESSFUL');
    }
    );
  }

  MapForForm(JSONdata) {
    this.alternateEmail = JSONdata.email;
    this.DOB = JSONdata.dob;
    this.Gender = JSONdata.gender;
    this.Fname = JSONdata.first_name;
    this.Lname = JSONdata.last_name;
    this.Addr1 = JSONdata.address;
    this.Addr2 = JSONdata.address2;
    this.Country = JSONdata.country;
    this.State = JSONdata.state;
    this.Zip = JSONdata.zip_code;
  }

  getCountries() {
    this.cs.allCountries().
    subscribe(
      data2 => {
        this.AllCountries = data2.Countries;
        // console.log('Data:', this.AllCountries);
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  GoHome() {
    this.Route.navigate(['']);
  }

  submit(form: NgForm) {
    this.proser.SetData(this.usrname, form).subscribe( data => {
      console.log('DATA UPLOADED SUCCESSFULLY');
    });
  }

  reset(form: NgForm) {
     // form.resetForm();
    // this.usrname = this.Globals.GetUserName;
     form.resetForm({
      username : this.usrname,
      email : this.originalData.email,
      DOB : this.originalData.dob,
      Gender : this.originalData.gender,
      firstName: this.originalData.first_name,
      lastName: this.originalData.last_name,
      address : this.originalData.address,
      address2 : this.originalData.address2,
      country : this.originalData.country,
      state : this.originalData.state,
      zip : this.originalData.zip_code,
     });
     this.stateInfo = [];
    }

    onChangeCountry(countryValue) {
      this.stateInfo = this.AllCountries[countryValue].States;
    }

}
