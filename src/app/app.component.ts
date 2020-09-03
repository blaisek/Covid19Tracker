import { Component, OnInit, ViewChild} from '@angular/core';
import { GithubApiService } from './Service/github-api.service';
import { Observable } from 'rxjs';
import { ChartService } from './Service/chart.service';
import { MapService } from './Service/map.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  title = 'Covid19Tracker';
  data$: Observable<any>;

  public search = '' ;
  constructor(
    private _api: GithubApiService,
    private _chart: ChartService,
    private _mapView: MapService,
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

  getCoordonate(event) {

    if ( event.key === 'France'){
      let coor = [2.3514616, 48.8566969];
      let zoom = 5;
      this._mapView.mapCenter(coor, zoom);
    } else if (event.key === 'United Kingdom'){
      let coor = [-0.12755, 51.507222];
      let zoom = 5;
      this._mapView.mapCenter(coor, zoom);
    } else if (event.key === 'India') {
      let coor = [78.4610647, 17.3887859];
      let zoom = 5;
      this._mapView.mapCenter(coor, zoom);
    } else if (event.key === 'Netherlands') {
      let coor = [4.8979755, 52.3745403];
      let zoom = 6;
      this._mapView.mapCenter(coor, zoom);
    } else if (event.key === 'Denmark') {
      let coor = [12.5700724, 55.6867243];
      let zoom = 6;
      this._mapView.mapCenter(coor, zoom);
    } else if (event.key === '"Korea') {
      let coor = [127.6961188, 36.638392];
      let zoom = 6;
      this._mapView.mapCenter(coor, zoom);
    } else if (event.key === 'Brazil') {
      let coor = [-41.9294776, -12.285251];
      let zoom = 4;
      this._mapView.mapCenter(coor, zoom);
    }else if (event.key === ' Sint Eustatius and Saba"') {
      let coor = [-62.9653116, 17.4865252];
      let zoom = 6;
      this._mapView.mapCenter(coor, zoom);
    }else if (event.key === 'Russia') {
      let coor = [37.6174943, 55.7504461];
      let zoom = 6;
      this._mapView.mapCenter(coor, zoom);
    }
     else {
      let coor = [event.value[0].Long_, event.value[0].Lat];
      let zoom = 5;
      this._mapView.mapCenter(coor, zoom);
    }

  }

  handleAction(event){

    const {type, payload} = event;

    // Map
    if (type === 'geoMarker') {
      const CountryRegion = payload.Combined_Key;
      const Confirmed = payload.Confirmed;
      const Death = payload.Deaths;
      const Recovered = payload.Recovered;
      const Active = payload.Active;
      this._chart.chart({CountryRegion, Confirmed, Death, Recovered, Active});
    }
    // List
    else
    {

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

      this.getCoordonate(event);

    }

  }
}


