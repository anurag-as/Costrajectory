import { Component, OnInit, Input } from '@angular/core';
declare let google: any;
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() AnalyticData;
  @Input() Mode;
  @Input() ldate;
  @Input() rdate;
  @Input() timeline;

  constructor() { }

  ngOnInit() {
    // google.charts.load('current', {packages: ['corechart']});
    // google.charts.setOnLoadCallback(this.drawChart);
    // console.log('LINE ', this.AnalyticData);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    // console.log('LINE ', this.AnalyticData);
    google.charts.load('current', {packages: ['corechart']});
    try {
      google.charts.setOnLoadCallback(this.drawChart(this.AnalyticData, this.Mode, this.ldate, this.rdate, this.timeline));
    } catch (error) {
      return;
    }
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
        for ( let i = 0; i <= DateArray.length - 2; i += 1) {
          if ( (new Date(bill.Date)).getTime() < (DateArray[0][0]).getTime() ) {
            positionUnderConsideration = 0;
            value = parseInt(bill.Amount , 10);
            date = new Date(bill.Date);
            break;
          } else if ( (new Date(bill.Date)).getTime() >= (DateArray[DateArray.length - 1 ][0]).getTime() ) {
            positionUnderConsideration = DateArray.length - 1 ;
            middle = true;
            value = parseInt(bill.Amount , 10);
            date = new Date(bill.Date);
            break;
          } else if ( (new Date(bill.Date)).getTime() === (DateArray[i][0]).getTime() ) {
            positionUnderConsideration = i;
            value = parseInt(bill.Amount , 10);
            date = new Date(bill.Date);
            break;
          // tslint:disable-next-line:max-line-length
          } else if ( (new Date(bill.Date)).getTime() > (DateArray[i][0]).getTime() && (new Date(bill.Date)).getTime() < (DateArray[i + 1][0]).getTime() ) {
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
      CumulativeDataArray.push([DateArray[i][0], DateArray[i][1], sumData]);
    }
    return CumulativeDataArray;
    }

drawChart(AnalyticData, Mode, leftDate, RightDate, timeline) {
/*     const data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);
 */
    const data = new google.visualization.DataTable();
    // var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Spend');
    data.addColumn('number', 'Cumulative');
    data.addRows(this.createDataset(AnalyticData, Mode, leftDate, RightDate, timeline));
    const options = {
      title: 'Spend Analyser',
      width : 700,
      height: 500,
      chartArea: {width: '87%', height: '80%'},
      legend: { position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('curve_chart2'));

    chart.draw(data, options);
  }

}
