import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy} from '@angular/core';
import {Chart} from 'chart.js';
import { Observable, Subscription } from 'rxjs';
import { ChartService } from 'src/app/Service/chart.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})


export class ChartComponent implements AfterViewInit, OnDestroy {

  public mainChart: Chart;
  public country$: Observable<string>;
  public sub: Subscription;
  name:string;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @Input() country: string;

  constructor( private chart: ChartService ) {}

ngAfterViewInit(){
  this.sub = this.chart.country$.subscribe( (name) => {
    this.name = name;
    this.init();
  });


}


  init(){


      const ctx = this.canvas.nativeElement.getContext('2d');
      this.mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Confirmed', 'Death', 'Recovered', 'Active'],
            datasets: [{
                label: this.name,
                data: [10, 2, 7, 3],
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

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
