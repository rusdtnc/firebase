import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { JoueurService } from '../joueur/joueur.service';
import { JoueurInfos } from '../joueur/joueur';
import { Observable } from 'rxjs/index';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/reservation';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  joueurConnecte: JoueurInfos;

  constructor(public authService: AuthService, public joueurService: JoueurService, public reservationService: ReservationService, private cr: ChangeDetectorRef) {

  }

  reservation :Reservation[] = [];


  tableResa = [];

  events$: Observable<Array<CalendarEvent<any>>>;

  ngOnInit() {
    this.joueurService.value$.subscribe(val => this.joueurConnecte = val);
    this.reservationService.reservationsEvent$.subscribe(val => this.reservation = val);
  }

  isCourtReserve(court, heure) {
    let result = null;
    this.reservation.filter(resa => {
      return (resa.court === court && moment(moment(),'YYYY/MM/DD HH').hours(heure).isSame(moment(resa.debut,'YYYY/MM/DD HH'),'hour'))
    }).map(data => {
      if(data) {
        result = data.designation;
      }
    });

    return result;
  }

  displayInfo(court, heure) {
    console.log(`Court : ${court} Heure :${heure}`);
  }
}
