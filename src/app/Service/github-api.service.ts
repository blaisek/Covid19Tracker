import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {


  date = new Date();
  day = this.date.getDate() < 10 ? '0' + (this.date.getDate() - 2) : (this.date.getDate() - 2).toString();
  month = this.date.getMonth() < 10 ?  '0' + (this.date.getMonth() + 1) : (this.date.getMonth() + 1).toString();
  year = this.date.getFullYear();

  baseApi = 'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports';

  apiUrl = `${this.baseApi}/${this.month}-${this.day}-${this.year}.csv`;
  private _data$: BehaviorSubject<any> = new BehaviorSubject([]);
  public data$ = this._data$.asObservable();

  constructor(
    private _httpClient: HttpClient
    ) {}

  async getData() {

    try{

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
            Deaths: parseInt(el['Deaths'], 20)
          };
        });
      });
      this._data$.next(data);
    }
    catch (e) {
      alert('an error occurred, please try later');
    }
  }


}
