import { Component } from '@angular/core';
import { NewsService } from './news.service';
import { News } from './types';

@Component({
  selector: 'app-news',
  template: `
    <h1>Newsverwaltung</h1>
    <app-news-list #list (select)="selectNews($event)"></app-news-list>
    <app-news-input [news]="selectedNews" (ok)="list.refresh()"></app-news-input>
  `,
  styles: [
  ]
})
export class NewsComponent {
  selectedNews: News;

  constructor(private newsService: NewsService) {}

  selectNews(id: number) {
    if (id) {
      // edit => retrieve news using news service
      this.newsService.retrieve(id)
        .then(news => this.selectedNews = news);
    }
    else {
      // add => create new news object
      this.selectedNews = new News();
    }
  }
}
