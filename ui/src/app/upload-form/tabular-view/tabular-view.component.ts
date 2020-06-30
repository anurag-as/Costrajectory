import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ViewContainerRef, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { Getdata } from './GetData.service';
import { GlobalConfigsService } from '../../global-configs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

interface BillData {
  username: string;
  TableEntries: any;
  ImageEntries: any;
}

interface DateRange {
  MinDate: Date;
  MaxDate: Date;
}

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css'],
})
export class TabularViewComponent implements OnInit {
  BillEntries = [];
  DataLoading = 'Started';
  UserName: string;
  FormData: BillData;
  Category = 'All';
  // tslint:disable-next-line:variable-name
  Date_l_Personal: Date;
  // tslint:disable-next-line:variable-name
  Date_r_Personal: Date;
  constructor( private DataGetter: Getdata, public globals: GlobalConfigsService) { }

  RefreshData() {
    this.BillEntries = [];
    this.DataGetter.GetData( this.globals.GetUserName ).subscribe( data => {
      // console.log('MAIN DATA : ', data);
      this.DataLoading = 'Success';
      if (typeof(data.TableEntries) === 'undefined' ) {
        return;
      }
      this.FormData = data;
      this.GetDataRange();
      for ( const entry of data.TableEntries) {
        if (entry.Identifier !== 'False') {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            true,
            entry.Identifier,
            data.ImageEntries[entry.Identifier],
            entry.uid,
            entry.category
          ]);
        } else {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            false,
            entry.Identifier,
            undefined,
            entry.uid,
            entry.category
          ]);
        }
      }
    }, err => {
      this.DataLoading = 'Fail';
    });
  }

  ngOnInit() {
    this.DataGetter.GetData( this.globals.GetUserName ).subscribe( data => {
      // console.log('MAIN DATA : ', data);
      this.DataLoading = 'Success';
      if (typeof(data.TableEntries) === 'undefined' ) {
        return;
      }
      this.FormData = data;
      this.GetDataRange();
      for ( const entry of data.TableEntries) {
        if (entry.Identifier !== 'False') {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            true,
            entry.Identifier,
            data.ImageEntries[entry.Identifier],
            entry.uid,
            entry.category
          ]);
        } else {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            false,
            entry.Identifier,
            undefined,
            entry.uid,
            entry.category
          ]);
        }
      }
    }, err => {
      this.DataLoading = 'Fail';
    });
  }

  public AppendEntry(f: NgForm, userName: string) {
    // this.BillEntries.push([this.BillEntries.length + 1, f.value.name, f.value.des, f.value.date, f.value.val]);
    // console.log('===============+', this.BillEntries);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  GetMaxMinDatePersonal(PersonalData): DateRange {
    const BillArr: Date[] = [];
    for ( const bill of PersonalData.TableEntries) {
      BillArr.push( this.DateStringToDate(bill.Date));
    }
    return {
      MinDate: new Date(Math.min.apply(null, BillArr)),
      MaxDate: new Date(Math.max.apply(null, BillArr))
    };
  }

  GetDataRange() {
    const DateData = this.GetMaxMinDatePersonal(this.FormData);
    this.Date_l_Personal = DateData.MinDate;
    this.Date_r_Personal = DateData.MaxDate;
  }

  DateStringToDate( DateString: string): Date {
    const parts = DateString.split('-');
    const mydate = new Date( parseInt (parts[0], 10), parseInt (parts[1], 10) - 1, parseInt (parts[2], 10));
    return mydate;
  }

  FilterData() {
    const leftDate = this.Date_l_Personal;
    const rightDate = this.Date_r_Personal;
    this.BillEntries = [];
    for ( const entry of this.FormData.TableEntries) {
      const Entry_date = new Date(entry.Date);
      Entry_date.setHours(0, 0, 0, 0);
      // tslint:disable-next-line:max-line-length
      if ( (entry.category === this.Category || this.Category === 'All') && Entry_date.getTime() >= leftDate.getTime() && Entry_date.getTime() <= rightDate.getTime()) {
        if (entry.Identifier !== 'False') {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            true,
            entry.Identifier,
            this.FormData.ImageEntries[entry.Identifier],
            entry.uid,
            entry.category
          ]);
        } else {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            false,
            entry.Identifier,
            undefined,
            entry.uid,
            entry.category
          ]);
        }
      }
    }
  }

  ResetFilters() {
    this.GetDataRange();
    this.Category = 'All';
    this.FilterData();
  }

}
