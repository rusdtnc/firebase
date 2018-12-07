import { Component, Input, OnInit } from '@angular/core';
import { LigneClassement } from '../competition';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
@Component({
  selector: 'app-competition-classement',
  templateUrl: 'classement-competition.component.html',
  styleUrls: ['./classement-competition.component.scss']
})
export class ClasssementCompetitionComponent implements OnInit
{

  @Input() classement: LigneClassement[];

  idEquipe: number;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idEquipe = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  detailEquipe(idEquipe: number): void {
    console.log(idEquipe);

  }


}
