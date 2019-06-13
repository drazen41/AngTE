import { Component, OnInit } from '@angular/core';
import {IndicatorService} from '../indicator.service';
import {TEIndicator} from '../TEIndicator';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {
  indicators:TEIndicator[];
  constructor(private indicatorService:IndicatorService) { }

  ngOnInit() {
    //this.getIndicators();
    this.getIndicatorsByCountry();
  }
  getIndicators():void {
    this.indicatorService.getIndicators().subscribe(data => this.indicators = data);
  }
  getIndicatorsByCountry():void {
    this.indicatorService.getIndicatorsByCountry("").subscribe(data => this.indicators = data);
  }
  sortIndicators(prop:string){
    const sorted = this.indicators.sort((a,b) => a[prop]>b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    if (prop.charAt(0)==='-') {sorted.reverse();}
    return sorted;
  }
}
