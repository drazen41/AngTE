import { Component, OnInit } from '@angular/core';
import {TERating} from '../Rating';
import {RatingService} from '../rating.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ratings: TERating[] = [];
  constructor(private ratingService:RatingService) { }

  ngOnInit() {
    this.getRatings();
  }
  getRatings(): void {
    //this.ratingService.getRatings().subscribe(ratings => this.ratings = ratings.slice(0,5));
    this.ratingService.getRatings().subscribe(ratings => this.ratings = ratings.filter(r => r.TE > 99));
  }

}
