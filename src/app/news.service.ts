import { Injectable } from '@angular/core';
import {News} from './News';
//import {RATINGS} from './mock-ratings';
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
export class NewsService {
  private newsUrl = "https://api.tradingeconomics.com/news/";
  private newsCountryUrl = "https://api.tradingeconomics.com/news/country/";
  constructor(private http:HttpClient) { }
  getLatestNews():Observable<News[]>{
    return this.http.get<News[]>(this.newsUrl,httpOptions)
    .pipe(
      tap(_ => console.log('console - fetched news' )));
    
  }
  getNewsByCountry(country:string):Observable<News[]>{
    return this.http.get<News[]>(this.newsCountryUrl + country,httpOptions);
  }
}
