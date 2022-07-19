import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
      
    return this.return();

  }

  canLoad(): Observable<boolean> | boolean {

      return this.return();
      
  }

  return() {
    return this.authService.verificarAutentificacion()
    .pipe(
      tap( estaAutenticado => {
        if ( !estaAutenticado ) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
}