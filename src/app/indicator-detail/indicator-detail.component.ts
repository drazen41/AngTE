import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RatingService} from '../rating.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TEIndicatorDetail} from '../TEIndicatorDetail';
import {IndicatorService} from '../indicator.service';
//import {OrderBy} from '../OrderBy';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {  IBarChartOptions,IChartistAnimationOptions,IChartistData} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';
import {map} from 'rxjs/operators';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
  
})
export class IndicatorDetailComponent implements OnInit {
  private indicatorHistory:TEIndicatorDetail[];
  public order = "DateTime";
  chart:Chart;
  country:string;
  indicator:string;
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
  
  //********* Ng2-charts start */
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  /* public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ]; */
  public barChartLabels: string [] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any [] = [];
  //******** Ng2-charts end */
  constructor(private indicatorService:IndicatorService,
    private route:ActivatedRoute,
    private location:Location) { }

  ngOnInit() {
    //this.getIndicatorHistory();
    this.getIndicatorHistory1();
  }
  getIndicatorHistory():void{
    const country = this.route.snapshot.paramMap.get('country').split('-').join(' ');
    const indicator = this.route.snapshot.paramMap.get('indicator').split('-').join(' ');
    this.country = country;
    this.indicatorService.getIndicatorHistory(country,indicator)
    .subscribe(data => this.indicatorHistory = data, err => console.log('Error getting history',err.getCode(),err.getError()),
  () => {
   
  });
  
  }
  getIndicatorHistory1():void{
    const country = this.route.snapshot.paramMap.get('country').split('-').join(' ');
    const indicator = this.route.snapshot.paramMap.get('indicator').split('-').join(' ');
    this.country = country;
    this.indicator = indicator;
    console.log(country);
    this.indicatorService.getIndicatorHistory(country,indicator)
    .subscribe(data => {
      //console.log(data);
      let dates = data.map(data => data.DateTime);
      let val = data.map(data => +data.Value);
      this.country = country;
      let newDates = [];
      dates.forEach(date => {
        let jsDate = new Date(date);
        let year = jsDate.getFullYear();
        let month = jsDate.getMonth()+1;
        let dan = jsDate.getDate();
        
        let newDate =year + "-" + month + "-" + dan;
        newDates.push(newDate);
       //console.log(year+'>'+month+'>'+dan);

      }); 
      //console.log(newDates);
      
      this.chart = new Chart('canvas',{
        type:'bar',
        data: {
          labels: newDates,
          datasets: [{
            data: val

          }]
        },
        options:{
          legend: {
            display:false
          },
          scales: {
            xAxes: [{
              display:true
            }],
            yAxes:[{
              display:true
            }]
          }
        }
        
      });
      


      //console.log(data);
    });

  }
}
