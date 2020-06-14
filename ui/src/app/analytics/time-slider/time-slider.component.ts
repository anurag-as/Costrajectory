import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

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
  @Input() Timer: string;
  @Output() Timerange = new EventEmitter <{Ldate: Date, rDate: Date}> ();
  @Input() MinDate: Date;
  @Input() MaxDate: Date;
  loading = false;
  DataObj = new Week();
  minValue = 0;
  maxValue = this.DataObj.GetSteps(new Date(2020, 1, 1), new Date(2020, 6, 9));
  SendCounter = 0;
  SendDateLeft: Date;
  SendDateRight: Date;
  options = {
    floor: 0,
    ceil: this.DataObj.GetSteps( this.MinDate, this.MaxDate),
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          if (this.SendCounter === 2) {
            this.SendDateLeft = this.DataObj.TranslateToDate(this.MinDate , value);
            this.SendCounter = 0;
            this.Timerange.emit({Ldate: this.SendDateLeft, rDate: this.SendDateRight});
          } else {
            this.SendDateLeft = this.DataObj.TranslateToDate(this.MinDate , value);
            this.SendCounter += 1;
          }
          return this.DataObj.TranslateToString(this.MinDate , value);
        case LabelType.High:
          if (this.SendCounter === 2) {
            // this.Timerange.emit({Ldate: this.MinDate, rDate: this.DataObj.TranslateToDate(this.MinDate , value)});
            this.SendDateRight = this.DataObj.TranslateToDate(this.MinDate , value);
            this.SendCounter = 0;
            this.Timerange.emit({Ldate: this.SendDateLeft, rDate: this.SendDateRight});
          } else {
            this.SendDateRight = this.DataObj.TranslateToDate(this.MinDate , value);
            this.SendCounter += 1;
          }
          return this.DataObj.TranslateToString(this.MinDate , value);
        default:
          return this.DataObj.TranslateToString(this.MinDate , value);
      }
    }
  };
  constructor( private cdr: ChangeDetectorRef ) {}

  ngOnInit() {
    // console.log('INput to time slider: ', this.MinDate, this.MaxDate);
    if (this.MinDate === undefined || this.MaxDate === undefined) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    if ( chg.Timer === undefined || chg.Timer.currentValue  === 'Week') {
      this.DataObj = new Week();
    } else if ( chg.Timer.currentValue  === 'Month' ) {
      this.DataObj = new Month();
    } else if ( chg.Timer.currentValue  === 'Quarter' ) {
      this.DataObj = new Quarter();
    } else {
      this.DataObj = new Year();
    }
    this.minValue = 0;
    this.maxValue = this.DataObj.GetSteps( this.MinDate, this.MaxDate);
    this.options.ceil = this.maxValue;
  }
}

export class Week {

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


  GetSteps(startDate: any, endDate: any) {
    return Math.round((endDate - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
  }

  TranslateToString(startDate: Date, value: number) {
    return this.addDays(startDate , value * 7).toDateString();
  }

  TranslateToDate(startDate: Date, value: number) {
    return this.addDays(startDate , value * 7);
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

  TranslateToDate(startDate: Date, value: number) {
    return this.addDays(startDate , value * 30);
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

  TranslateToDate(startDate: Date, value: number) {
    return this.addDays(startDate , value * 92);
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

  TranslateToDate(startDate: Date, value: number) {
    return this.addDays(startDate , value * 365);
  }

}

