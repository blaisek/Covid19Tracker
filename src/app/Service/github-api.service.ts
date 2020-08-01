import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  private _data$: BehaviorSubject<any> = new BehaviorSubject([]);
  public data$ = this._data$.asObservable();
  public day: any ;
  public month: any;
  public year: number;
  private _baseApi = 'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports';

  constructor(
    private _httpClient: HttpClient
    ) {}


  getDate() {
    const date = new Date();
    this.month = (date.getMonth() + 1);
    this.day = (date.getDate() - 1);
    this.year = date.getFullYear();

    if (this.day < 10 && this.day >= 1){ this.day = ( '0' + this.day.toString() ); }
    if (this.month < 10){ this.month = ( '0' + this.month.toString()); }

    if (this.day < 1 && this.month === 3 ) { this.day = 28; this.month = '02'; }
    if (this.day < 1 && this.month === 5)  { this.day = 30; this.month = '04'; }
    if (this.day < 1 && this.month === 7)  {this.day = 30; this.month = '06'; }
    if (this.day < 1 && this.month === 10) {this.day = 30; this.month = '09'; }
    if (this.day < 1 && this.month === 12) {this.day = 30; this.month = 11; }
    else if (this.day < 1 && this.month < 10  ){this.month = ('0' + (this.month - 1).toString()) ; this.day = 31; }
  }

  async getData() {
  this.getDate();
  try{

  const apiUrl = `${this._baseApi}/${this.month}-${this.day}-${this.year}.csv`;

  const data = await this._httpClient.get(apiUrl).toPromise().then((resp: any) => {
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
            Confirmed: parseInt(el['Confirmed'], 10),
            Deaths: parseInt(el['Deaths'], 10),
            Active: parseInt(el['Active'], 10),
            Recovered: parseInt(el['Recovered'], 10),
          };
        });
      });
      this._data$.next(data);
    }
    catch (e) {
      alert('an error occurred, please try later');
      console.log(e);

    }
  }


}
