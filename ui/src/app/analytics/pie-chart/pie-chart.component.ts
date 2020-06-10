import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    google.charts.load('current', {packages:['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    let data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

    let options = {
      title: 'My Daily Activities',
      pieHole: 0.4,
      is3D: true,
      width : 600,
      height: 500,
      chartArea: {width: '90%', height: '90%'},
    };

    let chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

}
