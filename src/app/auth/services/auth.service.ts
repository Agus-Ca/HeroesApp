import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Auth } from '../pages/interfaces/auth.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor( 
    private http: HttpClient ) { }

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
              .pipe(
                tap( auth => this._auth = auth ),
                tap( auth => localStorage.setItem('token', auth.id))
              );
  }

  logout() {
    localStorage.removeItem('token');
    this._auth = undefined;
  }

  verificarAutentificacion(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) {
      return of(false);
    } else {
      return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
              .pipe(
                map( auth => {
                  this._auth = auth;
                  return true;
                })
              );
    }
  }

}