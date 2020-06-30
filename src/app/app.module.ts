import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GithubApiService } from './Service/github-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {GroupByPipe} from '../app/pipes/group-by-pipe';
import { OlMapComponent } from '../app/components/olmap/olmap.component';
import { IonicModule } from '@ionic/angular';
import { ChartComponent } from '../app/components/chart/chart.component';
import { DetailComponent } from './components/detail/detail.component';
@NgModule({
  declarations: [
    AppComponent,
    GroupByPipe,
    OlMapComponent,
    ChartComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IonicModule.forRoot({
      mode: 'md'
    })
  ],
  providers: [
    GithubApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
