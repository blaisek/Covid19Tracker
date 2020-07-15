import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Chart} from 'chart.js';

@Injectable({
  providedIn: 'root',
})


export class ChartService {

  public mainChart: Chart;
  private _data$: BehaviorSubject<any> = new BehaviorSubject([]);
  public data$ = this._data$.asObservable();

  constructor() {}

  chart(data){

      this._data$.next(data);

  }

}
