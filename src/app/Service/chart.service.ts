import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Chart} from 'chart.js';

@Injectable({
  providedIn: 'root',
})


export class ChartService {

  public mainChart: Chart;
  private _country$ : BehaviorSubject<string> = new BehaviorSubject<string>('pays');
  public country$ = this._country$.asObservable();


  constructor() {}

  chart(event){

      this._country$.next(event);
      console.log(event);

  }

  getCountry() {

    return this.country$;
  }
}
