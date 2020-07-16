import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class ChartService {

  private _data$: BehaviorSubject<any> = new BehaviorSubject([]);
  public data$ = this._data$.asObservable();

  constructor() {}

  chart(data){

      this._data$.next(data);

  }

}
