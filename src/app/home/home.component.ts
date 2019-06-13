import { Component, OnInit } from '@angular/core';
import {TERating} from '../Rating';
import {RatingService} from '../rating.service';
import {IndicatorService} from '../indicator.service';
import {TEIndicator} from '../TEIndicator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ratings: TERating[] = [];
  indicators: TEIndicator[]=[];
  constructor(private ratingService:RatingService
    ,private indicatorService:IndicatorService) { }

  ngOnInit() {
    this.getRatings();
    this.getIndicators();
  }
  getRatings(): void {
    //this.ratingService.getRatings().subscribe(ratings => this.ratings = ratings.slice(0,5));
    this.ratingService.getRatings().subscribe(ratings => this.ratings = ratings.filter(r => +r.TE > 99));
  }
  getIndicators(){
    this.indicatorService.getIndicatorsByCountry("mexico").subscribe(data => this.indicators = data.slice(0,20));
  }
}
