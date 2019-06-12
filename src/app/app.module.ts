import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RatingsComponent } from './ratings/ratings.component';
import { RatingDetailComponent } from './rating-detail/rating-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {NgHttpLoaderModule} from 'ng-http-loader';
import { RatingSearchComponent } from './rating-search/rating-search.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    RatingsComponent,
    RatingDetailComponent,
    MessagesComponent,
    DashboardComponent,
    RatingSearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxUiLoaderModule,
    NgHttpLoaderModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
