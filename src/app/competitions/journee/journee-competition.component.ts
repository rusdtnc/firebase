import { Component, Input } from '@angular/core';
import { Journee } from '../competition';
import * as moment from 'moment';


@Component({
  selector: 'app-competition-journee',
  templateUrl: 'journee-competition.component.html',
  styleUrls: ['./journee-competition.component.scss']
})
export class JourneeCompetitionComponent {

  @Input() journee: Journee;

  constructor() {}

  getDateJournee(journee: Journee): any {
    if(journee.rencontres.length > 0) {
      return moment(journee.rencontres[0].dateTheorique).locale('fr').format('DD MMMM YYYY');
    }
    return null;
  }

}
