import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Chart} from 'chart.js';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/Service/chart.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})


export class ChartComponent implements AfterViewInit, OnDestroy {

  public mainChart: Chart;
  public countryName: string;
  public Confirmed: string;
  public Death: string;
  public Recovered: string;
  public Active: string;
  public dataSub: Subscription;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  constructor( private chart: ChartService ) {}

ngAfterViewInit(){

  this.dataSub = this.chart.data$.subscribe((data) => {

    this.countryName = data.CountryRegion;
    this.Confirmed = data.Confirmed;
    this.Death = data.Death;
    this.Recovered = data.Recovered;
    this.Active = data.Active;

    if (this.mainChart){
      this.mainChart.destroy();
    }

    this.initChart();

  });

}


ngOnDestroy(){
  this.dataSub.unsubscribe();
}


  initChart(){


      const ctx = this.canvas.nativeElement.getContext('2d');
      this.mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Confirmed', 'Deaths', 'Recovered', 'Active'],
            datasets: [{
                label: this.countryName || 'Country',
                data: [this.Confirmed, this.Death, this.Recovered, this.Active],
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
