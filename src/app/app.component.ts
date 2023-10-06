import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, combineLatest, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { BeerService } from './services/beer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prueba_tecnica_o2o';

  form: FormGroup = new FormGroup({});
  private searchTerms = new Subject<string>();

  beers$: Observable<any[]> = new Observable<any[]>();
  beerList: any[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private beerService: BeerService
  ) {
    this.form = this.formBuilder.group({
      beer: ['']
    });
  }

  ngOnInit(): void {
    // Crear Observables separados para cada tipo de búsqueda
    const searchByName$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByName(term))
    );

    const searchByHops$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByHops(term))
    );

    const searchByMalt$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByMalt(term))
    );

    const searchByFood$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeersByFood(term))
    );

    // Combinar todos los observables en uno solo
    this.beers$ = combineLatest([
      searchByName$,
      searchByHops$,
      searchByMalt$,
      searchByFood$
    ]).pipe(
      // Mapear los resultados de cada observable en un solo array
      switchMap(([searchByName, searchByHops, searchByMalt, searchByFood]) => {
        return [...searchByName, ...searchByHops, ...searchByMalt, ...searchByFood];
      })
    );

    this.beers$.subscribe((data) => 
      this.saveBeer(data)
    );

    // Si hay duplicados en la lista, eliminarlos
    this.beerList = this.beerList.filter((item, index) => {
      return this.beerList.indexOf(item) === index;
    });
  }

  public saveBeer(data: any): void {
    this.beerList.push(data);
    console.log('Data: ', data); 
  }

  public searchBeer(): void {
    console.log('Beer: ', this.form.get('beer')?.value);
  }

  search(event: Event): void {

    // Cada vez que buscamos, reseteamos la lista de cervezas
    this.beerList = [];
    
    const term = (event.target as HTMLInputElement).value;
    console.log('Term: ', term);

    if (term != '') {
      this.searchTerms.next(term);
    }
  }
}
