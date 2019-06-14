import { Injectable } from '@angular/core';
import {TEIndicatorDetail} from './TEIndicatorDetail';
import {TEIndicator} from './TEIndicator';
import {Observable,of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError,map,tap,filter} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' :'application/json',
    'Authorization':'Client rflo8xtosclgl3i:e46covymlcpjx2z'
  })  
};

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private indicatorUrl = "https://api.tradingeconomics.com/indicators/";
  private indicatorCountryUrl = "https://api.tradingeconomics.com/country/";
  private indicatorHistoryUrl = "https://api.tradingeconomics.com/historical/country/";
  constructor(private http:HttpClient) { }
  getIndicators():Observable<TEIndicator[]>{
    return this.http.get<TEIndicator[]>(this.indicatorUrl,httpOptions)
    .pipe(tap(() => console.log("indicators fetched")));
  }
  getIndicatorsByCountry(country:string):Observable<TEIndicator[]>{
    if (country) {
      return this.http.get<TEIndicator[]>(this.indicatorCountryUrl + country,httpOptions)
      .pipe(tap(() => console.log("indicators fetched 1")));
    } else {
      var url = this.indicatorCountryUrl + "all";
      return this.http.get<TEIndicator[]>(this.indicatorCountryUrl + "all",httpOptions)
      .pipe(tap(() => console.log("fetched at " + url)));
    }
    
  }
  getIndicatorHistory(country:string, indicator:string):Observable<TEIndicatorDetail[]> {
    var url = this.indicatorHistoryUrl + country + "/indicator/" + indicator;
     return  this.http.get<TEIndicatorDetail[]>(this.indicatorHistoryUrl + country +"/indicator/" + indicator,httpOptions )
     .pipe(tap(() => console.log(url)));
    
  }
}
