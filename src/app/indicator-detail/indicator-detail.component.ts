import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RatingService} from '../rating.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TEIndicatorDetail} from '../TEIndicatorDetail';
import {IndicatorService} from '../indicator.service';
import {OrderBy} from '../OrderBy';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {
  private indicatorHistory:TEIndicatorDetail[];
  public order = "DateTime";
  constructor(private indicatorService:IndicatorService,
    private route:ActivatedRoute,
    private location:Location,) { }

  ngOnInit() {
    this.getIndicatorHistory();
  }
  getIndicatorHistory():void{
    const country = this.route.snapshot.paramMap.get('country').split('-').join(' ');
    const indicator = this.route.snapshot.paramMap.get('indicator').split('-').join(' ');
    this.indicatorService.getIndicatorHistory(country,indicator)
    .subscribe(data => this.indicatorHistory = data, err => console.log('Error getting history',err.getCode(),err.getError()),
  () => {
   
  });
 
  }

}
