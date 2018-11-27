import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { res } from './joueur.data';

@Injectable({
  providedIn: 'root'
})
export class JoueurBouchonService {

  getInfosJoueur(): Observable<any> {
    return of(res);
  }


}
