import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsService } from './news.service';
import { News } from './types';

@Component({
  selector: 'app-news-input',
  template: `
    <div *ngIf="news">
      <h2>{{ news.id ? 'Bearbeite News' : 'Füge News hinzu' }}</h2>

      <p *ngIf="news.id">
        <label for="id">ID:</label>
        <input type="number" [value]="news.id" id="id" readonly>
      </p>

      <p>
        <label for="title">Titel:</label>
        <input [(ngModel)]="news.title" id="title">
      </p>

      <p>
        <label for="text">Text:</label>
        <textarea [(ngModel)]="news.text" id="text"></textarea>
      </p>

      <p>
        <button (click)="finishWithOk()">Ok</button>
        <button (click)="finishWithCancel()">Abbrechen</button>
      </p>
    </div>
  `,
  styles: [`
    label {
      display: inline-block;
      width: 50px;
      vertical-align: top;
    }
  `]
})
export class NewsInputComponent  {
  @Input() news: News;
  @Output() ok = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private newsService: NewsService) {}

  finishWithOk(): void {
    this.createOrUpdate()
      .then(
        () => {
          this.ok.emit();
          this.news = null;
        }
      );
  }

  createOrUpdate(): Promise<any> {
    if (this.news.id) {
      // edit => update news
      return this.newsService.update(this.news);
    }
    else {
      // add => create news
      return this.newsService.create(this.news);
    }
  }

  finishWithCancel(): void {
    this.cancel.emit();
    this.news = null;
  }
}
