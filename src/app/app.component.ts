import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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

  constructor(private formBuilder: FormBuilder, private beerService: BeerService) {
    this.form = this.formBuilder.group({
      beer: ['']
    });
  }

  ngOnInit(): void {
    
    this.beers$ = this.searchTerms.pipe(
      debounceTime(300), // Espera 300ms de inactividad de escritura
      distinctUntilChanged(), // Ignora si el nuevo término de búsqueda es igual al anterior
      switchMap((term: string) => this.beerService.searchBeers(term))
    );
  }

  public searchBeer(): void {
    console.log('Beer: ', this.form.get('beer')?.value);
  }

  // Función para enviar el término de búsqueda al Subject
  search(event: Event): void {

    const term = (event.target as HTMLInputElement).value;

    this.searchTerms.next(term);
  }
}
