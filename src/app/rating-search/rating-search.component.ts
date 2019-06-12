import { Component, OnInit } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators';
import {TERating} from '../rating';
import {RatingService} from '../rating.service';

@Component({
  selector: 'app-rating-search',
  templateUrl: './rating-search.component.html',
  styleUrls: ['./rating-search.component.css']
})
export class RatingSearchComponent implements OnInit {
  ratings$: Observable<TERating[]>;
  private searchTerms = new Subject<string>();

  constructor(private ratingService:RatingService) { }
  search(term:string): void {
    this.searchTerms.next(term);
  }
  ngOnInit() {
    this.ratings$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=> this.ratingService.searchRatings(term)),
    );
  }

}
