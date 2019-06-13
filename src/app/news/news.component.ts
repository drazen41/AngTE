import { Component, OnInit } from '@angular/core';
import {News} from '../News';
import {NewsService} from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news:News[];
  constructor(private newsService:NewsService) { }

  ngOnInit() {
    //this.getLatestNews();
    this.getNewsByCountry();
  }
  getLatestNews():void {
    this.newsService.getLatestNews().subscribe(data => this.news = data);
    //console.log(this.news);
  }
  getNewsByCountry():void {
    this.newsService.getNewsByCountry("mexico").subscribe(data => this.news = data);
    
  }

}
