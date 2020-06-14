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
  WithoutCategoryFileter: any;
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
      MinDate: new Date(Math.min.apply(null, BillArr)),
      MaxDate: new Date(Math.max.apply(null, BillArr))
    };
  }

  GetMaxMinDateShared(GroupData): DateRange {
    const BillArr: Date[] = [];
    for (const GroupConsidered of GroupData) {
      for ( const bill of GroupConsidered.bill_data) {
        BillArr.push( this.DateStringToDate(bill.datetime));
      }
    }
    return {
      MinDate: new Date(Math.min.apply(null, BillArr)),
      MaxDate: new Date(Math.max.apply(null, BillArr))
    };
  }

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
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
    const WithoutCategoryFileterLocal = [];
    for ( const bill of SharedData[GroupIDx].bill_data) {
      if (bill.datetime >= LeftDate && bill.datetime <= RightDate) {
        WithoutCategoryFileterLocal.push(bill);
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
      WithoutCategoryFileter: WithoutCategoryFileterLocal
    };
  }

  PersonalMode(LeftDate: Date, RightDate: Date, PersonalData: any, CategoryChosen: string) {
    const DataBuffer = [];
    const WithoutCategoryFileterLocal = [];
    if (PersonalData === undefined) {
      return {
        LDate : LeftDate,
        RDate : RightDate,
        Category : CategoryChosen,
        Mode: 'Personal',
        Data: DataBuffer,
        GroupIdx: -1,
        WithoutCategoryFileter: WithoutCategoryFileterLocal
      };
    }
    for ( const bill of PersonalData.TableEntries) {
      // tslint:disable-next-line:max-line-length
      // console.log('PERSONAL INPUTS: ', bill, new Date(bill.Date), LeftDate, RightDate, new Date(bill.Date) >= LeftDate, new Date(bill.Date) <= RightDate);
      if (new Date(bill.Date) >= LeftDate && new Date(bill.Date) <= RightDate) {
        WithoutCategoryFileterLocal.push(bill);
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
      WithoutCategoryFileter: WithoutCategoryFileterLocal
    };
  }
}


