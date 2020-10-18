import { Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})

export class InputSearchComponent{
  allMovies;
  allMoviesArr: any[] = [];
  constructor(private http: HttpClient) { }
  inputFormControl = new FormControl('', [
    Validators.required
  ]);
  getErrorMessage(): string {
    if (this.inputFormControl.hasError('required')) {
      return 'You must enter a value';
    }
  }

  searchMovies(): void {
    const inputValue = this.inputFormControl.value;
    if (!inputValue){
      this.getErrorMessage();
    }else{
      this.http.get<any>('https://www.omdbapi.com/?s=' + inputValue + '&type=movie&apikey=60675a8d').subscribe(data => {
        if (data.Response === 'False' && data.Error === 'Too many results.'){
          this.allMoviesArr = [];
          alert('Please add additional text for movie search');
        }else if (data.Response === 'False' && data.Error === 'Movie not found!'){
          this.allMoviesArr = [];
          alert('Movie not found!');
        }else if (data.Response === 'False'){
          this.allMoviesArr = [];
          alert('Something went wrong with your request.\n' +
            'Try to reload page');
        }else{
          this.allMovies = data;
          this.allMoviesArr = [];
          this.allMoviesArr.push(this.allMovies.Search);
          this.allMoviesArr = this.allMoviesArr[0];
        }
      });
    }
  }
}
