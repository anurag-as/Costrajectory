import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

interface BillData {
  username: string;
  TableEntries: [];
  ImageEntries: [];
}

@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit {
  DataObj = new Week();
  minValue = 0;
  maxValue = this.DataObj.GetSteps(new Date(2020, 1, 1), new Date(2020, 6, 9));
  options = {
    floor: 0,
    ceil: this.maxValue,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return this.DataObj.TranslateToString(new Date(2020, 1, 1) , value);
        case LabelType.High:
          return this.DataObj.TranslateToString(new Date(2020, 1, 1) , value);
        default:
          return this.DataObj.TranslateToString(new Date(2020, 1, 1) , value);
      }
    }
  };

  ngOnInit() {}
  constructor() {}
}

export class Week {

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


  GetSteps(startDate: Date, endDate: Date) {
    return Math.round((endDate - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
  }

  TranslateToString(startDate: Date, value: number) {
    return this.addDays(startDate , value * 7).toDateString();
  }

}

export class Month {

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  GetSteps(startDate: Date, endDate: Date) {
    let months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 1 : months;
  }

  TranslateToString(startDate: Date, value: number) {
    return this.addDays(startDate , value * 30).toDateString();
  }


}
export class Quarter {

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  GetSteps(startDate: Date, endDate: Date) {
    let months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months / 4 <= 0 ? 1 : months / 4;
  }

  TranslateToString(startDate: Date, value: number) {
    return this.addDays(startDate , value * 92).toDateString();
  }

}

export class Year {
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  GetSteps(startDate: Date, endDate: Date) {
    let months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months / 12 <= 0 ? 1 : months / 12;
  }

  TranslateToString(startDate: Date, value: number) {
    return this.addDays(startDate , value * 365).toDateString();
  }

}

