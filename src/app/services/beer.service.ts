import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = 'https://api.example.com/beers';

  constructor(private http: HttpClient) { }

  searchBeers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${query}`);
  }
}
