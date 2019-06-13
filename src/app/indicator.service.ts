import { Injectable } from '@angular/core';
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
  constructor(private http:HttpClient) { }
  getIndicators():Observable<TEIndicator[]>{
    return this.http.get<TEIndicator[]>(this.indicatorUrl,httpOptions);
  }
  getIndicatorsByCountry(country:string){
    if (country) {
      return this.http.get<TEIndicator[]>(this.indicatorCountryUrl + country,httpOptions);
    } else {
      return this.http.get<TEIndicator[]>(this.indicatorCountryUrl + "all",httpOptions);
    }
    
  }
}
