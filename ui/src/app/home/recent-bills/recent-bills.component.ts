import { Component, OnInit } from '@angular/core';
import { Getdata } from '../../upload-form/tabular-view/GetData.service';
import { GlobalConfigsService } from '../../global-configs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

interface BillData {
  username: string;
  TableEntries: [];
  ImageEntries: [];
}

@Component({
  selector: 'app-recent-bills',
  templateUrl: './recent-bills.component.html',
  styleUrls: ['./recent-bills.component.css']
})
export class RecentBillsComponent implements OnInit {
  BillEntries = [];
  DataLoading = 'Started';
  UserName: string;
  FormData: BillData;

  constructor(private DataGetter: Getdata, public globals: GlobalConfigsService) { }

  ngOnInit() {
    this.ReloadData();
  }

  ReloadData() {
    this.DataGetter.GetData( this.globals.GetUserName ).subscribe( data => {
      // console.log('MAIN DATA : ', data);
      this.DataLoading = 'Success';
      this.FormData = data;
      if (typeof(data.TableEntries) === 'undefined' ) {
        return;
      }
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

      if (this.BillEntries.length > 4) {
        this.BillEntries.slice(0, 4);
      }

    }, err => {
      this.DataLoading = 'Fail';
    });
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
