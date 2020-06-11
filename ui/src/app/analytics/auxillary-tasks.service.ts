import { Injectable } from '@angular/core';
import { GlobalConfigsService } from '../global-configs.service';

interface DateRange {
  MinDate: Date;
  MaxDate: Date;
}

interface FilterParams {
  LDate: Date;
  RDate: Date;
  Category: string;
  Mode: string;
  SharedData: any;
  PersonalData: any;
  GroupIdx: number;
}

interface ReturnData {
  LDate: Date;
  RDate: Date;
  Category: string;
  Mode: string;
  Data: any;
  GroupIdx: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuxillaryTasksService {

  DateStringToDate( DateString: string): Date {
    const parts = DateString.split('-');
    const mydate = new Date( parseInt (parts[0], 10), parseInt (parts[1], 10) - 1, parseInt (parts[2], 10));
    return mydate;
  }

  GetMaxMinDatePersonal(PersonalData): DateRange {
    const BillArr: Date[] = [];
    for ( const bill of PersonalData.TableEntries) {
      BillArr.push( this.DateStringToDate(bill.Date));
    }

    return {
      MinDate: Math.min.apply(null, BillArr),
      MaxDate: Math.max.apply(null, BillArr)
    };
  }

  GetMaxMinDateShared(GroupData, GroupIdx): DateRange {
    const BillArr: Date[] = [];

    for ( const bill of GroupData[GroupIdx].bill_data) {
        BillArr.push( this.DateStringToDate(bill.datetime));
    }

    return {
      MinDate: Math.min.apply(null, BillArr),
      MaxDate: Math.max.apply(null, BillArr)
    };
  }

  constructor() { }
}

export class Filter {
  Username: string;
  constructor(public globals: GlobalConfigsService) {
    this.Username = globals.GetUserName;
  }

  FilterData(FilterParam: FilterParams): ReturnData {
    if ( FilterParam.Mode === 'Personal') {
      return this.PersonalMode( FilterParam.LDate,
                                FilterParam.RDate,
                                FilterParam.PersonalData,
                                FilterParam.Category);
    } else {
      return this.SharedMode( FilterParam.LDate,
                              FilterParam.RDate,
                              FilterParam.SharedData,
                              FilterParam.Category,
                              FilterParam.GroupIdx);
    }
  }

  SharedMode(LeftDate: Date, RightDate: Date, SharedData: any, CategoryChosen: string, GroupIDx: number): ReturnData {
    const DataBuffer = [];
    for ( const bill of SharedData[GroupIDx].bill_data) {
      if (bill.datetime >= LeftDate && bill.datetime <= RightDate) {
        if (CategoryChosen === 'All') {
          DataBuffer.push(bill);
        } else if ( CategoryChosen === bill.category) {
          DataBuffer.push(bill);
        }
      }
    }
    return {
      LDate : LeftDate,
      RDate : RightDate,
      Category : CategoryChosen,
      Mode: 'Shared',
      Data: DataBuffer,
      GroupIdx: GroupIDx,
    };
  }

  PersonalMode(LeftDate: Date, RightDate: Date, PersonalData: any, CategoryChosen: string) {
    const DataBuffer = [];
    for ( const bill of PersonalData.TableEntries) {
      if (bill.datetime >= LeftDate && bill.datetime <= RightDate) {
        if (CategoryChosen === 'All') {
          DataBuffer.push(bill);
        } else if ( CategoryChosen === bill.category) {
          DataBuffer.push(bill);
        }
      }
    }
    return {
      LDate : LeftDate,
      RDate : RightDate,
      Category : CategoryChosen,
      Mode: 'Personal',
      Data: DataBuffer,
      GroupIdx: -1,
    };
  }
}


