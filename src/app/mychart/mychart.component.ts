import {Chart} from 'chart.js';
import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import {IndicatorService} from '../indicator.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-mychart',
  template: '<canvas #bar></canvas>',
  styleUrls: ['./mychart.component.css']
})
export class MychartComponent implements OnInit {
  @ViewChild('bar') bar: ElementRef;
  constructor(private indicatorService:IndicatorService,
    private route:ActivatedRoute,
    private location:Location) { }

  ngOnInit() {
    this.createChart();
  }
  createChart(){
    const country = this.route.snapshot.paramMap.get('country').split('-').join(' ');
    const indicator = this.route.snapshot.paramMap.get('indicator').split('-').join(' ');
    let barCtx = this.bar.nativeElement;
    console.log(country);
    this.indicatorService.getIndicatorHistory(country,indicator)
    .subscribe(data => {
      console.log(data);
      let dates = data.map(data => data.DateTime);
      let val = data.map(data => +data.Value);
      let newDates = [];
      dates.forEach(date => {
        let jsDate = new Date(date);
        let newDate = jsDate.getFullYear() + '-' + jsDate.getMonth() + '-' + jsDate.getDay();
        newDates.push(newDate);
       

      }); 
      var chart = new Chart(barCtx,{
        type:'bar',
        data: {
          labels: dates,
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
  });
}
}
