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
  Categories = ['Travel','Shopping','Investments','Food','Utilities','Medical','Entertainment','Housing','Others']
  DatainValue = {
    'Travel':0,
    'Shopping':0,
    'Investments':0,
    'Food':0,
    'Utilities':0,
    'Medical':0,
    'Entertainment':0,
    'Housing':0,
    'Others':0,
  };
  DatainPercent= {
    'Travel':0,
    'Shopping':0,
    'Investments':0,
    'Food':0,
    'Utilities':0,
    'Medical':0,
    'Entertainment':0,
    'Housing':0,
    'Others':0,
  };
  ValueArray = [];
  ConsolidatedValue: any = [];
  ConsolidatedPecent: any = [];

  TotalSum: any;
  constructor(private DataGather: GetAllTransactionDetails, public globals: GlobalConfigsService) { }

  ngOnInit() {
    this.DataGather.GetData( this.globals.GetUserName ).subscribe( data => {
      // console.log('MAIN DATA : ', data);
      this.DataLoading = 'Success';
      this.FormData = data;
      
      for ( const entry of data.TableEntries) {
        this.DatainValue[entry.category] += parseInt(entry.Amount);
        this.ValueArray.push(parseInt(entry.Amount));
      }

      this.TotalSum = this.SumArray(this.ValueArray)

      for ( const category of this.Categories) {
        this.ConsolidatedValue.push({ label: category, y: this.DatainValue[category] });
        this.ConsolidatedPecent.push({ label: category, y: (parseInt(this.DatainValue[category]) / this.TotalSum) * 100 })
      }

      this.BarChartRender(this.ConsolidatedValue, this.Categories);
      this.PieChartRender(this.ConsolidatedPecent, this.Categories);

    }, err => {
      this.DataLoading = 'Fail';
    });
    
  }

  SumArray(arr): Number {
    return(arr.reduce((a, b) => a + b, 0))
  }

  BarChartRender(ConsolidatedValue, Categories) {
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
      // console.log('DATAPOINTS : ',ConsolidatedPecent, Categories, this.DatainValue, this.TotalSum );
      var chart = new CanvasJS.Chart("chartContainerPie", {
        animationEnabled: true,
        title: {
          text: ""
        },
        data: [{
          type: "pie",
          startAngle: 240,
          yValueFormatString: "##0.00\"%\"",
          indexLabel: "{label} {y}",
          dataPoints: ConsolidatedPecent
        }]
      });
      chart.render();
    }

}
