import { Options } from 'ng5-slider';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  value = 100;
  value2 = 200;
  options: Options = {
    floor: 0,
    ceil: 200
  };

  constructor() {
  }

  ngOnInit() {
    google.charts.load('current', {
      packages: ['annotationchart', 'table']
    });
    google.charts.setOnLoadCallback(this.drawChart);
  }

drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Kepler-22b mission');
  data.addColumn('string', 'Kepler title');
  data.addColumn('string', 'Kepler text');
  data.addColumn('number', 'Gliese 163 mission');
  data.addColumn('string', 'Gliese title');
  data.addColumn('string', 'Gliese text');
  data.addRows([
          [new Date(2314, 2, 15), 12400, undefined, undefined,
                                  10645, undefined, undefined],
          [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter',
                                  12374, undefined, undefined],
          [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall',
                                  15766, 'Gallantors', 'First Encounter'],
          [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!',
                                  34334, 'Gallantors', 'Statement of shared principles'],
          [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties',
                                  66467, 'Gallantors', 'Mysteries revealed'],
          [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost',
                                  79463, 'Gallantors', 'Omniscience achieved']
        ]);



  // Set chart options
  const options = {
    displayAnnotations: true
  };

  // Instantiate and draw our chart, passing in some options.
  const chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

}
