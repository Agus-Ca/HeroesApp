import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {

  constructor( private heroesService:HeroesService ) { }

  termino:string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  buscando() {
    this.heroesService.getSugerencia( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes );
  }

  opcionSeleccionada( event:MatAutocompleteSelectedEvent ) {

    if ( !event.option.value ) {
      this.heroeSeleccionado = undefined;
      console.log("no hay valor");
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroesById(heroe.id!)
      .subscribe( heroe => this.heroeSeleccionado = heroe);
  }
}