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
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
    console.log('PIE CHART : ', this.Category, this.AnalyticData, this.Mode);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
    console.log('PIE CHART : ', this.Category, this.AnalyticData, this.Mode);
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

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
