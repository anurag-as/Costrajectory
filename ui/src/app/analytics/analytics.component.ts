import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '.././canvasjs.min';
import {GetAllTransactionDetails} from './GetAllTransactionDetails.service';
import {GlobalConfigsService} from '../global-configs.service';

interface BillData {
  username: string;
  TableEntries: [];
  ImageEntries: [];
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  BillEntries = [];
  DataLoading = 'Started';
  UserName: string;
  FormData: BillData;
  Categories = ['Travel', 'Shopping', 'Investments', 'Food', 'Utilities', 'Medical', 'Entertainment', 'Housing', 'Others'];
  DatainValue = {
    Travel: 0,
    Shopping: 0,
    Investments: 0,
    Food: 0,
    Utilities: 0,
    Medical: 0,
    Entertainment: 0,
    Housing: 0,
    Others: 0,
  };
  DatainPercent = {
    Travel: 0,
    Shopping: 0,
    Investments: 0,
    Food: 0,
    Utilities: 0,
    Medical: 0,
    Entertainment: 0,
    Housing: 0,
    Others: 0,
  };
  ValueArray = [];
  ConsolidatedValue: any = [];
  ConsolidatedPecent: any = [];
  ConsolidatedDate: any = [];

  TotalSum: any;
  constructor(private DataGather: GetAllTransactionDetails, public globals: GlobalConfigsService) { }

  ngOnInit() {
    this.DataGather.GetData( this.globals.GetUserName ).subscribe( data => {
      console.log('MAIN DATA : ', data);
      this.DataLoading = 'Success';
      this.FormData = data;

      for ( const entry of data.TableEntries) {
        this.DatainValue[entry.category] = this.DatainValue[entry.category] + parseInt(entry.Amount, 10);
        this.ValueArray.push(parseInt(entry.Amount, 10));
        // this.ConsolidatedDate.push({y: parseInt(entry.Amount, 10), x: this.ConvertDatetoDateObj(entry.Date)});
        this.ConsolidatedDate = this.checkIfDateinArray(this.ConsolidatedDate, entry.Date, parseInt(entry.Amount, 10));
      }

      this.TotalSum = this.SumArray(this.ValueArray);

      for ( const category of this.Categories) {
        this.ConsolidatedValue.push({ label: category, y: this.DatainValue[category] });
        this.ConsolidatedPecent.push({ label: category, y: (parseInt(this.DatainValue[category], 10) / this.TotalSum) * 100 });
      }

      this.BarChartRender(this.ConsolidatedValue, this.Categories);
      this.PieChartRender(this.ConsolidatedPecent, this.Categories);
      this.LineChartrender(this.ConsolidatedDate);

    }, err => {
      this.DataLoading = 'Fail';
    });
  }

  SumArray(arr): number {
    return(arr.reduce((a, b) => a + b, 0));
  }

  ConvertDatetoDateObj(DateStr: string): Date {
    return new Date(parseInt(DateStr.split('-')[0], 10), parseInt(DateStr.split('-')[1], 10), parseInt(DateStr.split('-')[2], 10));
  }

  checkIfDateinArray(arr, date, valueToAdd) {
    const reference = this.ConvertDatetoDateObj(date);
    for ( const jsonObj of arr) {
      // console.log('COMPARING : ', jsonObj.x, reference);
      if (jsonObj.x.getTime() === reference.getTime()) {
        // console.log('MATCH');
        jsonObj.y = jsonObj.y + valueToAdd;
        return arr;
      }
    }
    arr.push({y: valueToAdd, x: reference});
    return arr;
  }
  BarChartRender(ConsolidatedValue, Categories) {
    console.log('DATAPOINTS BAR : ', ConsolidatedValue);
    const chart = new CanvasJS.Chart('chartContainerBar', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ''
      },
      data: [{
        type: 'column',
        dataPoints: ConsolidatedValue
      }]
    });

    chart.render();
      }

    PieChartRender(ConsolidatedPecent, Categories) {
      console.log('DATAPOINTS PIE : ', ConsolidatedPecent);
      const chart = new CanvasJS.Chart('chartContainerPie', {
        animationEnabled: true,
        title: {
          text: ''
        },
        data: [{
          type: 'pie',
          startAngle: 240,
          yValueFormatString: '##0.00"%"',
          indexLabel: '{label} {y}',
          dataPoints: ConsolidatedPecent
        }]
      });
      chart.render();
    }

    LineChartrender(DateList) {
      console.log('DATELIST: ', DateList);
      const chart = new CanvasJS.Chart('chartContainerline', {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: ''
        },
        axisX: {
          valueFormatString: 'DD MMM YYYY',
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          title: '',
          crosshair: {
            enabled: true
          }
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: 'pointer',
          verticalAlign: 'bottom',
          horizontalAlign: 'left',
          dockInsidePlotArea: true,
        },
        data: [{
          type: 'line',
          showInLegend: true,
          name: '',
          markerType: 'square',
          xValueFormatString: 'DD MMM, YYYY',
          color: '#F08080',
          dataPoints: DateList
        }],
    });
      chart.render();
  }


}
