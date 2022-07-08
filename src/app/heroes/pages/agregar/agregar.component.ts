import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
  `]
})
export class AgregarComponent implements OnInit {

  constructor( private heroeService:HeroesService,
               private activatedRoute:ActivatedRoute,
               private router:Router,
               private snackbar:MatSnackBar ) {}

  ngOnInit(): void {

    if( this.router.url.includes('editar') ) {
      this.activatedRoute.params
        .pipe(
          switchMap( ({ id }) => this.heroeService.getHeroesById( id ) )
        )
        .subscribe( heroe => this.heroe = heroe );
    }
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  guardarHeroe():void {
    if( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if ( this.heroe.id ) {
      // * ACTUALIZAR *
      this.heroeService.updateHeroe( this.heroe )
        .subscribe({
          next: () => {
            this.mostrarSnackbar('Registro actualizado');
          }
        });
    } else {
      // * CREAR *
      this.heroeService.addHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackbar('Registro creado');
        });
    }
  }

  borrarHeroe() {
    this.heroeService.deleteHeroe( this.heroe.id! )
      .subscribe({
        next: () => {
          this.router.navigate(['/heroes']);
        }
      });
  }

  mostrarSnackbar( mensaje:string ) {
    this.snackbar.open( mensaje, 'Ok!', { duration:2500 })
  }
}