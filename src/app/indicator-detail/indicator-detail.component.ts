import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RatingService} from '../rating.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TEIndicatorDetail} from '../TEIndicatorDetail';
import {IndicatorService} from '../indicator.service';
import {OrderBy} from '../OrderBy';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {
  private indicatorHistory:TEIndicatorDetail[];
  public order = "DateTime";
  view: any[] = [700,400];
  multi: any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: 5,
          value: 2650
        },
        {
          name: 10,
          value: 2800      },
        {
          name: 15,
          value: 2000
        }
      ]
    },
    {
      name: 'Yellow',
      series: [
        {
          name: 5,
          value: 2500
        },
        {
          name: 10,
          value: 3100
        },
        {
          name: 15,
          value: 2350
        }
      ]
    }
  ];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Color Value';
  timeline = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  single:any[];
  constructor(private indicatorService:IndicatorService,
    private route:ActivatedRoute,
    private location:Location,) { }

  ngOnInit() {
    this.getIndicatorHistory();
    this.single = this.indicatorHistory;
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
