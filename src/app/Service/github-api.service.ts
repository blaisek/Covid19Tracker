import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const mockdata = [

{

// Type d'object:

// Active: "67"
// Admin2: "Abbeville"
// Case-Fatality_Ratio: "US""
// Combined_Key: ""Abbeville"
// Confirmed: "67"
// Country_Region: "US"
// Deaths: "0"
// FIPS: "45001"
// Incidence_Rate: " South Carolina"
// Last_Update: "2020-06-15 03:33:14"
// Lat: "34.22333378"
// Long_: "-82.46170658"
// Province_State: "South Carolina"
// Recovered: "0"

}

];

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {


  date = new Date();
  day = this.date.getDate() - 1 < 10 ? '0' + (this.date.getDate() - 1) : (this.date.getDate() - 1).toString();
  month = this.date.getMonth() < 10 ?  '0' + (this.date.getMonth() + 1) : (this.date.getMonth() + 1).toString();
  year = this.date.getFullYear();

  baseApi = 'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports';

  apiUrl = `${this.baseApi}/${this.month}-${this.day}-${this.year}.csv`;
  private _data$: BehaviorSubject<any> = new BehaviorSubject([]); // observable qui accepte le type tableau
  public data$ = this._data$.asObservable(); // abbonement au flux de l'observable

  constructor(
    private _httpClient: HttpClient
    ) {}

  async getData() {

    const data = await this._httpClient.get(this.apiUrl).toPromise().then((resp: any) => {
      const {content = ''} = resp;
      return decodeURIComponent(escape(window.atob( content )));
    }).then(csv => {
      const titles = csv.slice(0, csv.indexOf('\n')).split(',');
      const rows = csv.slice(csv.indexOf('\n') + 1).split('\n');
      const data = rows.map(row => {
        const values = row.split(',');
        return titles.reduce((object, curr, i) => (object[curr] = values[i], object), {});
      });
      return data;
    })
    .then(data => {
      return data.map(el => {
        return {
          ...el,
          Confirmed: parseInt(el['Confirmed'], 10)
        }
      })
    })
    ;
    this._data$.next(data); // push dans l'observable le flux de data
  }


}
