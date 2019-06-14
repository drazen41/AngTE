import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RatingService} from '../rating.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TEIndicatorDetail} from '../TEIndicatorDetail';
import {IndicatorService} from '../indicator.service';
import {OrderBy} from '../OrderBy';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {  IBarChartOptions,IChartistAnimationOptions,IChartistData} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
  
})
export class IndicatorDetailComponent implements OnInit {
  private indicatorHistory:TEIndicatorDetail[];
  public order = "DateTime";
  type: ChartType = 'Bar';
  data: IChartistData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ]
  };
  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300
  };
  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };
  
  
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
