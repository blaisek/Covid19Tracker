import {Component, Input, AfterViewInit} from '@angular/core';


@Component ({

  selector: 'app-detail',
  template: ``,
  styles: []

})

export class DetailComponent implements AfterViewInit {
@Input() data: any;


ngAfterViewInit(){
  console.log('--->', this.data);

}

}
