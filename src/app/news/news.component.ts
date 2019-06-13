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
    this.getLatestNews();
  }
  getLatestNews():void {
    this.newsService.getLatestNews().subscribe(data => this.news = data);
  }

}
