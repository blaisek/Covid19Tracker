import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _mapCenter$ : BehaviorSubject<any> = new BehaviorSubject([]);
  public mapCenters$ = this._mapCenter$.asObservable();

  constructor() { }

    mapCenter(options, zoom) {

      let coor = {
        options,
        zoom
      };

      this._mapCenter$.next(coor);
  }
}
