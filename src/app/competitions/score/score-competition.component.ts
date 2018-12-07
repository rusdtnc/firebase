import { Component, Input, OnInit } from '@angular/core';
import { JourneeRencontre } from '../competition';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { isDefaiteEquipe, isVictoireEquipe } from '../../utils/score';

@Component({
  selector: 'app-competition-score',
  templateUrl: 'score-competition.component.html',
  styleUrls: ['./score-competition.component.scss']
})
export class ScoreCompetitionComponent implements OnInit {

  @Input() rencontre: JourneeRencontre;

  idEquipe: number;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idEquipe = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  isVictoireEquipe(rencontre: JourneeRencontre): boolean {
    return isVictoireEquipe(rencontre,this.idEquipe);
  }

  isDefaiteEquipe(rencontre: JourneeRencontre): boolean {
    return isDefaiteEquipe(rencontre,this.idEquipe);
  }

  getDateReelle(rencontre: JourneeRencontre): any {
    if(rencontre.dateTheorique !== rencontre.dateReelle) {
      return moment(rencontre.dateReelle).locale('fr').format('DD MMMM YYYY')
    }

    return null;
  }

  detailEquipe(idEquipe: number): void {
    console.log(idEquipe);

  }

}
