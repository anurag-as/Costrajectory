import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-predictor-chart',
  templateUrl: './predictor-chart.component.html',
  styleUrls: ['./predictor-chart.component.css']
})
export class PredictorChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
       const data = google.visualization.arrayToDataTable([
         ['Age', 'Weight'],
         [ 8,      12],
         [ 4,      5.5],
         [ 11,     14],
         [ 4,      5],
         [ 3,      3.5],
         [ 6.5,    7]
       ]);

       const options = {
         title: 'Age vs. Weight comparison',
         legend: 'none',
         width : 600,
        height: 500,
        chartArea: {width: '90%', height: '90%'},
         crosshair: { trigger: 'both', orientation: 'both' },
         trendlines: {
           0: {
             type: 'polynomial',
             degree: 3,
             visibleInLegend: true,
           }
         }
       };

       const chart = new google.visualization.ScatterChart(document.getElementById('polynomial2_div'));
       chart.draw(data, options);
     }
}
