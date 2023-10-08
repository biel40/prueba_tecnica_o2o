import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, combineLatest, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { BeerService } from './services/beer.service';
import { Beer } from './models/beer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prueba_tecnica_o2o';
  form: FormGroup = new FormGroup({});
  private searchTerms = new Subject<string>();
  beers$: Observable<Beer> = new Observable<Beer>();
  beerList: Beer[] = [];

  private debounceTime = 200;

  constructor(
    private formBuilder: FormBuilder,
    private beerService: BeerService
  ) {
    this.form = this.formBuilder.group({
      beer: ['']
    });
  }

  ngOnInit(): void {
    const searchByName$ = this.searchTerms.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByName(term))
    );

    const searchByHops$ = this.searchTerms.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByHops(term))
    );

    const searchByMalt$ = this.searchTerms.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByMalt(term))
    );

    const searchByFood$ = this.searchTerms.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByFood(term))
    );

    this.beers$ = combineLatest([
      searchByName$,
      searchByHops$,
      searchByMalt$,
      searchByFood$
    ]).pipe(
      switchMap(([searchByName, searchByHops, searchByMalt, searchByFood]) => {
        return [...searchByName, ...searchByHops, ...searchByMalt, ...searchByFood];
      })
    );

    this.beers$.subscribe((data) => {
      this.beerList.push(data);

      this.beerList.sort((a, b) => a.name.localeCompare(b.name));

      this.beerList = this.beerList.filter((beer, index, self) =>
        index === self.findIndex((t) => (
          t.name === beer.name
        ))
      );
    });
  }

  public saveBeer(data: any): void {
    this.beerList.push(data);
    console.log('Data: ', data);
  }

  search(event: Event): void {
    this.beerList = [];

    const term = (event.target as HTMLInputElement).value;

    if (term != '') {
      this.searchTerms.next(term);
    }
  }
}
