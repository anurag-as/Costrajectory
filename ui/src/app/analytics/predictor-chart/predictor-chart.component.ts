import { Component, OnInit, Input } from '@angular/core';
declare let google: any;
@Component({
  selector: 'app-predictor-chart',
  templateUrl: './predictor-chart.component.html',
  styleUrls: ['./predictor-chart.component.css']
})
export class PredictorChartComponent implements OnInit {
  @Input() AnalyticData;
  @Input() Mode;
  @Input() ldate;
  @Input() rdate;
  @Input() timeline;

  constructor() { }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    // console.log('LINE ', this.AnalyticData);
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart(this.AnalyticData, this.Mode, this.ldate, this.rdate, this.timeline));
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  AddElementToArray(DateArray, positionUnderConsideration, middle, value, date) {
    if ( middle ) {
      DateArray.splice(positionUnderConsideration + 1, 0, [date, value]);
    } else {
      DateArray[ positionUnderConsideration ][1] = value;
    }
    return DateArray;
  }


  createDataset(Adata, Mode, ldate, rdate, timeline) {
    let DateArray = [];
    const TimelineDictionary = {
      Week : 7,
      Month : 30,
      Quarter : 93,
      Year : 365
    };
    let currentDate = this.addDays(ldate, -TimelineDictionary[timeline]);
    const endDate = this.addDays(rdate, 2 * TimelineDictionary[timeline]);
    while ( currentDate <= endDate) {
      DateArray.push([currentDate, 0]);
      currentDate = this.addDays(currentDate, TimelineDictionary[timeline]);
    }
    DateArray.push([endDate, 0]);

    // now iterate through the data
    if ( Mode === 'Personal') {
      for (const bill of Adata.Data) {
        let positionUnderConsideration = -1;
        let middle = false;
        let value = 0;
        let date: Date;
        for ( let i = 0; i <= DateArray.length - 1; i += 1) {
          if ( new Date(bill.Date) === DateArray[i][0] ) {
            positionUnderConsideration = i;
            value = parseInt(bill.Amount , 10);
            date = new Date(bill.Date);
            break;
          } else if ( new Date(bill.Date) > DateArray[i][0] && new Date(bill.Date) < DateArray[i + 1][0] ) {
            positionUnderConsideration = i;
            middle = true;
            value = parseInt(bill.Amount , 10);
            date = new Date(bill.Date);
            break;
          }
        }
        DateArray = this.AddElementToArray(DateArray, positionUnderConsideration, middle, value, date);
        }
      } else {
        for (const bill of Adata.Data) {
          let positionUnderConsideration = -1;
          let middle = false;
          let value = 0;
          let date: Date;
          for ( let i = 0; i <= DateArray.length - 1; i += 1) {
            if ( (new Date(bill.datetime)).getTime() === (DateArray[i][0]).getTime() ) {
              positionUnderConsideration = i;
              value = parseInt(bill.amount , 10);
              date = new Date(bill.datetime);
              break;
            } else if ( (new Date(bill.datetime)).getTime() > (DateArray[i][0]).getTime()
                     && (new Date(bill.datetime)).getTime() < (DateArray[i + 1][0]).getTime() ) {
              positionUnderConsideration = i;
              middle = true;
              value = parseInt(bill.amount , 10);
              date = new Date(bill.datetime);
              break;
            }
          }
          DateArray = this.AddElementToArray(DateArray, positionUnderConsideration, middle, value, date);
          }
        }

    const CumulativeDataArray = [];
    let sumData = 0;
    for ( let i = 0; i <= DateArray.length - 1; i += 1) {
      sumData += DateArray[i][1];
      CumulativeDataArray.push([DateArray[i][0], sumData]);
    }
    return CumulativeDataArray;
    }

  drawChart(AnalyticData, Mode, leftDate, RightDate, timeline) {
       /* const data = google.visualization.arrayToDataTable([
         ['Age', 'Weight'],
         [ 8,      12],
         [ 4,      5.5],
         [ 11,     14],
         [ 4,      5],
         [ 3,      3.5],
         [ 6.5,    7]
       ]); */
       const data = new google.visualization.DataTable();
       data.addColumn('date', 'Date');
       data.addColumn('number', 'Spend');
       data.addRows(this.createDataset(AnalyticData, Mode, leftDate, RightDate, timeline));

       const options = {
         title: 'Spend Predictor',
         width : 600,
        height: 500,
        chartArea: {width: '90%', height: '90%'},
         crosshair: { trigger: 'both', orientation: 'both' },
         trendlines: {
           0: {
             type: 'polynomial',
             degree: 3,
           }
         }
       };

       const chart = new google.visualization.ScatterChart(document.getElementById('polynomial2_div'));
       chart.draw(data, options);
     }
}
