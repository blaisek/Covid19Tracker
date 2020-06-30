import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import {Chart} from 'chart.js';
import {GithubApiService} from '../../Service/github-api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})


export class ChartComponent implements AfterViewInit {

  public mainChart: Chart;

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  // @Input() datas: number;
  // @Input() labels: string;

  constructor( private _service: GithubApiService ) {}

ngAfterViewInit(){
    this.init();
  }


init(){
    const ctx = this.canvas.nativeElement.getContext('2d');
    this.mainChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Confirmed', 'Death', 'Recovered', 'Active'],
          datasets: [{
              label: ' pays ',
              data: [12, 2, 7, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
      }
}
