import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    const options = {
      title: 'Company Performance',
      curveType: 'function',
      width : 700,
      height: 500,
      chartArea: {width: '87%', height: '80%'},
      legend: { position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('curve_chart2'));

    chart.draw(data, options);
  }

}
