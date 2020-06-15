import { Component, OnInit, Input } from '@angular/core';
declare let google: any;
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() Category: string;
  @Input() AnalyticData: any;
  @Input() Mode: string;
  constructor() { }

  ngOnInit() {
    // google.charts.load('current', {packages: ['corechart']});
    // google.charts.setOnLoadCallback(this.drawChart);
    console.log('PIE CHART : ', this.Category, this.AnalyticData, this.Mode);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    console.log('PIE CHART CHANGE : ', this.Category, this.AnalyticData, this.Mode);
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart(this.AnalyticData, this.Mode));
  }

  uniqueElements(ArrayOfData) {
    const columns = ['Travel', 'Shopping', 'Investments', 'Food', 'Utilities', 'Medical', 'Entertainment', 'Housing', 'Others'];
    const dict = {
      Travel : 0,
      Shopping : 0,
      Investments : 0,
      Food : 0,
      Utilities : 0,
      Medical : 0,
      Entertainment : 0,
      Housing : 0,
      Others : 0
    };
    const finalizedData = [ArrayOfData[0]];
    const Value = [];
    for ( const entry of ArrayOfData) {
      if ( entry === ArrayOfData[0]) {
        continue;
      }
      dict[entry[0]] += entry[1];
    }

    for ( const entry of columns) {
      if (dict[entry] !== 0) {
        finalizedData.push([entry, dict[entry]]);
      }
    }
    console.log('Finalized Data : ', finalizedData);
    return finalizedData;

  }

  drawChart(AnalyticData, Mode) {
    /*
    const ArrayOfItems = [];
    let data : any;
    console.log('INSIDE DRAW PIE CHART :', AnalyticData, Mode);
    if ( AnalyticData === undefined) {
      const data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
      ]);

    } else {
      if ( Mode === 'Personal') {
        for (const bill of AnalyticData.WithoutCategoryFileter) {
          ArrayOfItems.push([bill.category, parseInt(bill.Amount, 10)]);
        }
        console.log('TABLE :', ArrayOfItems);
        const data = google.visualization.arrayToDataTable([ArrayOfItems]);
      }
    }*/
    const ArrayOfItems = [['Category', 'Spends']];
    if ( Mode === 'Personal') {
      for (const bill of AnalyticData.WithoutCategoryFileter) {
        ArrayOfItems.push([bill.category, parseInt(bill.Amount, 10)]);
      }
    }
    // const data = google.visualization.arrayToDataTable([ArrayOfItems]);
    const data = google.visualization.arrayToDataTable(this.uniqueElements(ArrayOfItems));
    /*
    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);*/
    // const data = google.visualization.arrayToDataTable(ArrayOfItems);

    const options = {
      title: 'Time-wise Spend',
      pieHole: 0.4,
      is3D: true,
      width : 600,
      height: 500,
      chartArea: {width: '90%', height: '90%'},
    };

    const chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

}
