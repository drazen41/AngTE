import { Component, OnInit } from '@angular/core';
import {TERating} from '../Rating';
import {RatingService} from '../rating.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
 /*  rating: TERating = {
    Country: 'Croatia',
    TE: 'OK',
    Date: 'Today',
    TE_Outlook: 'OK',
    Rating: 'BBB-',
    Outlook: 'Stable',
    SP
  }; */
  /* columnDefs = [
    {headerName: 'Make', field: 'make', sortable:true, filter:true },
    {headerName: 'Model', field: 'model', sortable:true, filter:true  },
    {headerName: 'Price', field: 'price', sortable:true, filter:true }
]; */
columnDefs = [
  {headerName: 'Country', field: 'Country',sortable:true, filter:true },
  {headerName: 'TE', field: 'TE', sortable:true, filter:true  },
  {headerName: 'TE Outlook', field: 'TE_Outlook', sortable:true, filter:true },
  {headerName: 'S&Ps', field: 'SP', sortable:true, filter:true },
  {headerName: 'S&Ps Outlook', field: 'SP_Outlook', sortable:true, filter:true },
  {headerName: 'Moodys', field: 'Moodys', sortable:true, filter:true },
  {headerName: 'Moodys Outlook', field: 'Moodys_Outlook', sortable:true, filter:true },
  {headerName: 'Fitch', field: 'Fitch', sortable:true, filter:true },
  {headerName: 'Fitch_outlook', field: 'Fitch_outlook', sortable:true, filter:true }
];

/* rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
]; */
rowData : any;
 
  ratings: TERating[];
  selectedRating: TERating;
  onSelect(rating:TERating): void {
    this.selectedRating = rating;
  } 
  constructor(private ratingService:RatingService, private spinner:NgxSpinnerService) { }
  getRatings():void {
    //this.ratings = this.ratingService.getRatings();
    //this.spinner.show('loader-01');
    /* setTimeout(() => {
      // spinner ends after 5 seconds 

      this.spinner.hide();
    }, 500);   */
    this.ratingService.getRatings().subscribe(ratings => this.ratings = ratings); 
    //this.spinner.hide('loader-01');
   
  }
  ngOnInit() {
   
   
    this.getRatings();
    //this.rowData = this.ratingService.getRatings(); 
    //this.ratings.filter(rating => rating.Country === "Croatia");
  }

}
