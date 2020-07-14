import { Component, OnInit } from '@angular/core';
import { GithubApiService } from './Service/github-api.service';
import { Observable } from 'rxjs';
import { ChartService } from './Service/chart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  title = 'Covid19Tracker';
  data$: Observable<any>;
  constructor(
    private _api: GithubApiService,
    private _chart: ChartService,
  ){}

  ngOnInit(){
    this.load();
  }

 async load(){
    await this._api.getData().catch(err => err);
    this.data$ =  this._api.data$;
  }

  handleAction(event){

    const {type, payload} = event;

    switch (type) {

      case 'geoMarker':
      // console.log(payload.Country_Region);
      this._chart.chart(payload.Country_Region);
      break;

      default:
      // console.log(event.key);
      this._chart.chart(event.key);
    }

  }
}


