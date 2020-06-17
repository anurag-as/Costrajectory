import { Component, OnInit, Input } from '@angular/core';
declare let google: any;

@Component({
  selector: 'app-diff-chart',
  templateUrl: './diff-chart.component.html',
  styleUrls: ['./diff-chart.component.css']
})
export class DiffChartComponent implements OnInit {
  @Input() AnalyticData;
  @Input() Mode;
  @Input() ldate;
  @Input() rdate;
  @Input() timeline;

  constructor() { }

  ngOnInit() {
    // google.charts.load('current', {packages: ['bar']});
    // google.charts.setOnLoadCallback(this.drawChart);
  }

    // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    // console.log('LINE ', this.AnalyticData);
    google.charts.load('current', {packages: ['bar']});
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
    DateArray = [[this.addDays(rdate, -3 * TimelineDictionary[timeline]) , 0, 0],
                [this.addDays(rdate, -2 * TimelineDictionary[timeline]) , 0, 0],
                [this.addDays(rdate, -1 * TimelineDictionary[timeline]) , 0, 0],
                [this.addDays(rdate, 0 * TimelineDictionary[timeline]) , 0, 0],
                [this.addDays(rdate, 1 * TimelineDictionary[timeline]) , 0, 0]];
    // now iterate through the data
    if ( Mode === 'Personal') {
      for (const bill of Adata.WithoutCategoryFileter) {
        for ( let i = 0; i <= DateArray.length - 1; i += 1) {
          if ( (new Date(bill.Date)).getTime() > (DateArray[i][0]).getTime()
              && (new Date(bill.Date)).getTime() <= (DateArray[i + 1][0]).getTime() ) {
            if ( bill.category ===  Adata.Category) {
              DateArray[i][2] += parseInt(bill.Amount , 10);
            }
            DateArray[i][1] += parseInt(bill.Amount , 10);
          }
        }
      }
      } else {
        for (const bill of Adata.WithoutCategoryFileter) {
          for ( let i = 0; i <= DateArray.length - 1; i += 1) {
            if ( (new Date(bill.datetime)).getTime() > (DateArray[i][0]).getTime()
                && (new Date(bill.datetime)).getTime() <= (DateArray[i + 1][0]).getTime() ) {
              if ( bill.category ===  Adata.Category) {
                DateArray[i][2] += parseInt(bill.amount , 10);
              }
              DateArray[i][1] += parseInt(bill.amount , 10);
            }
          }
          }
          }

    for ( let i = 0; i <= DateArray.length - 1; i += 1) {
      DateArray[i][0] = (DateArray[i][0]).toLocaleDateString('en-US');
    }
    console.log('ADATA : ', DateArray, Adata);

    return(DateArray);
    }

  drawChart(AnalyticData, Mode, leftDate, RightDate, timeline) {
    if ( this === undefined) {
      return;
    }
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Cumulative');
    data.addColumn('number', 'Spend');
    data.addRows(this.createDataset(AnalyticData, Mode, leftDate, RightDate, timeline));

    /* let data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ]); */

    const options = {
      chart: {
        title: 'Last 5 timelines',
        subtitle: 'Comparision against total spend',
      }
    };

    const chart = new google.charts.Bar(document.getElementById('columnchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

}
