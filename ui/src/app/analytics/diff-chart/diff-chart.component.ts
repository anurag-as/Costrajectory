import { Component, OnInit } from '@angular/core';
declare let google: any;

@Component({
  selector: 'app-diff-chart',
  templateUrl: './diff-chart.component.html',
  styleUrls: ['./diff-chart.component.css']
})
export class DiffChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    google.charts.load('current', {packages: ['bar']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    let data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ]);

    const options = {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      }
    };

    const chart = new google.charts.Bar(document.getElementById('columnchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

}
