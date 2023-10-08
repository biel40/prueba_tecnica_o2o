import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Beer } from '../models/beer';

@Injectable({
    providedIn: 'root'
})
export class BeerService {

    private apiUrl = 'https://api.punkapi.com/v2/beers';

    constructor(private http: HttpClient) { 

    }

    searchBeersByName(query: string): Observable<any> {
        return this.http.get<Beer>(`${this.apiUrl}?beer_name=${query}`);
    }

    searchBeersByHops(query: string): Observable<any> {
        return this.http.get<Beer>(`${this.apiUrl}?hops=${query}`);
    }

    searchBeersByMalt(query: string): Observable<any> {
        return this.http.get<Beer>(`${this.apiUrl}?brewed_before=${query}`);
    }

    searchBeersByFood(query: string): Observable<any> {
        return this.http.get<Beer>(`${this.apiUrl}?food=${query}`);
    }

   
}
