import { Component, OnInit } from '@angular/core';
import { GithubApiService } from './Service/github-api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  title = 'Covid19Tracker';
  data$: Observable<any>;
  constructor(
    private _api: GithubApiService
  ){}

  ngOnInit(){
    this.load();
  }

 async load(){
    await this._api.getData().catch(err => err);
    this.data$ =  this._api.data$;
  }

  async handleAction($event){
    console.log('output', $event);

  }
}


