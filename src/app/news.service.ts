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
    'Authorization':'Client guest:guest'
  })  
};

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }
}
