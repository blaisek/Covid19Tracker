import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GithubApiService } from './Service/github-api.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ChartService } from './Service/chart.service';
import {PIPES} from './pipes/index';
import {COMPONENT} from './components/index';
@NgModule({
  declarations: [
    AppComponent,
    PIPES,
    COMPONENT
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IonicModule.forRoot({
      mode: 'ios'
    })
  ],
  providers: [
    GithubApiService,
    ChartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
