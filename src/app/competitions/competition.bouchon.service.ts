import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { competitions, detailCompetition } from './competition.data';

@Injectable({
  providedIn: 'root'
})
export class CompetitionBouchonService {

  getCompetitions(): Observable<any> {
    return of(competitions);
  }

  getDetailCompetition(): Observable<any> {
    return of(detailCompetition)
  }


}
