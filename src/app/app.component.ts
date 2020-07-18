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
  public search = '' ;
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

  searchCountry(event){

    const search = event.detail.value;

    this.search = search;
  }

  handleAction(event){

    const {type, payload} = event;

    if (type === 'geoMarker') {
      const CountryRegion = payload.Combined_Key;
      const Confirmed = payload.Confirmed;
      const Death = payload.Deaths;
      const Recovered = payload.Recovered;
      const Active = payload.Active;
      this._chart.chart({CountryRegion, Confirmed, Death, Recovered, Active});
    }else{
      const CountryRegion = event.key;
      const Confirmed = event.value.reduce((prev, next) => {
                return prev + parseInt(next.Confirmed, 10);
              }, 0);
      const Death = event.value.reduce((prev, next) => {
                return prev + parseInt(next.Deaths, 10);
              }, 0);
      const Recovered = event.value.reduce((prev, next) => {
                return prev + parseInt(next.Recovered, 10);
              }, 0);
      const Active = event.value.reduce((prev, next) => {
                return prev + parseInt(next.Active, 10);
              }, 0);
      this._chart.chart({CountryRegion, Confirmed, Death, Recovered, Active});
    }
  }
}


