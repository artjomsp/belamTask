import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public omdbId: string;
  movie: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.omdbId = this.route.snapshot.paramMap.get('omdbId');
    this.http.get<any>('https://www.omdbapi.com/?i=' + this.omdbId + '&apikey=60675a8d').subscribe(data => {
      this.movie = data;
      });
  }
}
