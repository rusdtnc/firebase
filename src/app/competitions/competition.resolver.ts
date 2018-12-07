import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { concat, Observable } from 'rxjs/index';
import { CompetitionService } from './competition.service';
import { take } from 'rxjs/internal/operators';

@Injectable()
export class DetailCompetitionResolver implements Resolve<any> {
  constructor(private _competitionService: CompetitionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this._competitionService.fetchDetailCompetition(route.paramMap.get('id'));
    return this._competitionService.detailCompetition$.pipe(take(1));
  }
}

@Injectable()
export class CompetitionResolver implements Resolve<any> {
  constructor(private _competitionService: CompetitionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this._competitionService.fetchCompetitions();

    return this._competitionService.equipesMasculines$.pipe(
      take(1));
  }
}
