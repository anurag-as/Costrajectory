import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ViewContainerRef, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { Getdata } from './GetData.service';
import { GlobalConfigsService } from '../../global-configs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

interface BillData {
  username: string;
  TableEntries: [];
  ImageEntries: [];
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
  constructor( private DataGetter: Getdata, public globals: GlobalConfigsService) { }

  ngOnInit() {
    this.DataGetter.GetData( this.globals.GetUserName ).subscribe( data => {
      // console.log('MAIN DATA : ', data);
      this.DataLoading = 'Success';
      this.FormData = data;
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
    console.log('===============+', this.BillEntries);
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

}
