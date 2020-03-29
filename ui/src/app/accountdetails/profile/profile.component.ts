import { Component, OnInit } from '@angular/core';
import { GlobalConfigsService } from '../../global-configs.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { CountriesService } from './countries.service';

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

  constructor(private Globals: GlobalConfigsService, private Route: Router, private cs: CountriesService) {
    this.usrname = Globals.GetUserName;
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.cs.allCountries().
    subscribe(
      data2 => {
        this.AllCountries = data2.Countries;
        console.log('Data:', this.AllCountries);
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }
  
  GoHome() {
    this.Route.navigate(['']);
  }

  submit(form: NgForm) {

  }

  reset(form: NgForm) {
    form.resetForm();
    this.usrname = this.Globals.GetUserName;
    }

    onChangeCountry(countryValue) {
      this.stateInfo = this.AllCountries[countryValue].States;
      this.cityInfo = this.stateInfo[0].Cities;
      console.log(this.cityInfo);
    }

    onChangeState(stateValue) {
      this.cityInfo = this.stateInfo[stateValue].Cities;
      // console.log(this.cityInfo);
    }

}
