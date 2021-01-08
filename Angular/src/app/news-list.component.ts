import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewsService } from './news.service';
import { News } from './types';

@Component({
  selector: 'app-news-list',
  template: `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titel</th>
          <th><button (click)="addNews()">News hinzufügen</button></th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let news of newsList">
          <td>{{ news.id }}</td>
          <td>{{ news.title }}</td>
          <td>
            <button (click)="editNews(news)"><img src="assets/edit.gif"></button>
            <button (click)="deleteNews(news)"><img src="assets/delete.gif"></button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    th, td {
      border: 1px solid black;
      padding: 5px;
    }
  `]
})
export class NewsListComponent implements OnInit {
  @Output() select = new EventEmitter<number>();
  newsList: News[];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.newsService.retrieveAll()
      .then(newsList => this.newsList = newsList)
  }

  addNews(): void {
    this.select.emit();
  }

  editNews(news: News): void {
    this.select.emit(news.id);
  }

  deleteNews(news: News): void {
    if (confirm('Willst du die News wirklich löschen?')) {
      this.newsService.delete(news.id)
        .then(() => this.refresh());
    }
  }
}
