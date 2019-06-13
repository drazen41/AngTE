import { Injectable } from '@angular/core';
import {TERating} from './Rating';
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
var buffer = '';
@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratingUrl = "https://api.tradingeconomics.com/ratings/";
  private countries = "nigeria,portugal,italy,greece,spain,croatia,serbia,slovenia";
  private historyRatingUrl = "https://api.tradingeconomics.com/ratings/historical/";
  private ratings$: Observable<TERating[]>;
  //headers : HttpHeaders;
  constructor(private messageService:MessageService, private http:HttpClient) { 
   // this.headers = new HttpHeaders();
   // this.headers.append("Authorization","Client guest:guest");
   //this.ratings$ = this.http.get<TERating[]>(this.ratingUrl,httpOptions);
  }
  getRatings(): Observable<TERating[]>{
    
  // var ratings = this.http.get<TERating[]>(this.ratingUrl + this.countries,httpOptions);
   var ratings = this.http.get<TERating[]>(this.ratingUrl,httpOptions);
   /* var ratings = this.http.get<TERating[]>(this.ratingUrl,httpOptions).pipe(
     map(rat => rat),
    filter(rat => ratings.TE > 40)); */
   //ratings.pipe(filter(ratings => ratings.Country > 40));
    this.messageService.add('Ratings fetched.');
    //return of(RATINGS);
    return ratings;
  }
  /* getRating(country:String): Observable<TERating>{
    this.messageService.add(`RatingService: fetched rating country=${country}`);
    return of(RATINGS.find(rating => rating.Country === country));
  } */
  getHistoryRatings(country:String) : Observable<TERating[]>{
    this.messageService.add(`RatingService: fetched history rating country=${country}`);
    var ratings = this.http.get<TERating[]>(this.historyRatingUrl + country,httpOptions)
    .pipe(
      tap(_ => console.log('console - fetched ratings' )),
      catchError(this.handleError<TERating[]>('getHistoryRatings',[])));
    return ratings;
  }
  searchRatings(term:string): Observable<TERating[]>{
   /*  if (!term.trimLeft()) {
      return of([]);
    } */
    /* return this.ratings$.pipe(
      
      map(x => x.filter(rating => rating.Country === term),
    tap(_ => console.log(term)))
    ); */
     return this.http.get<TERating[]>(`${this.ratingUrl}${term}`,httpOptions).pipe(
      tap(_ => console.log(`found ratings matching "${term}"`)),
     
    catchError(this.handleError<TERating[]>('searchRatings',[]))
    ); 

  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
