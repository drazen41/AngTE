import { Component, OnInit,Input } from '@angular/core';
import {TERating} from '../Rating';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RatingService} from '../rating.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-rating-detail',
  templateUrl: './rating-detail.component.html',
  styleUrls: ['./rating-detail.component.css']
})
export class RatingDetailComponent implements OnInit {
  @Input() rating:TERating;
  public ratings:TERating[];
  public country:string;
  constructor(
    private route:ActivatedRoute,
    private ratingService:RatingService,
    private location:Location,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit() {
    //this.getRating();
    /* this.spinner.show();
    setTimeout(() => {
      // spinner ends after 5 seconds 

      this.spinner.hide();
    }, 500);   */
    this.getHistoryRatings();
    //this.spinner.hide();
  }
  /* getRating():void{
    const country = this.route.snapshot.paramMap.get('country');
    this.country = country;
    this.ratingService.getRating(country)
    .subscribe(rating => this.rating = rating);
  } */
  goBack(): void {
    this.location.back();
  }
  getHistoryRatings():void{
    this.spinner.show();
    const country = this.route.snapshot.paramMap.get('country');
    this.ratingService.getHistoryRatings(country)
    .subscribe(ratings => this.ratings = ratings, err => console.log('Error getting ratings',err.getCode(),err.getError()),
  () => {

  });
  this.spinner.hide();
  }

}
