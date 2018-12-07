import { Component, OnInit } from '@angular/core';
import { JoueurService } from './joueur.service';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/internal/operators';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/reservation';
import * as moment from 'moment';
import { Single } from '../utils/graph';
import { animateTabs } from '../utils/animation';
declare var $: any;

moment.locale('fr');

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.scss']
})
export class JoueurComponent implements OnInit {

  victoiresDefaites: Single[] = [];

  viewVd = [300, 150];
  view = [700, 300];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = 'right';
  showXAxisLabel = false;
  tooltipDisabled = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = false;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true;
  animations: boolean = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;
  showDataLabel = false;


  joueur: any;

  nbReservations: number;
  reservationsJoueur = [];

  scheme = {
    domain: ['#327262', '#d37a46']
  }


  constructor(private _fb: FormBuilder,
              public _joueurService: JoueurService,
              private _reservationService: ReservationService) {
    this._reservationService.nbReservationsJoueur$.subscribe(val => this.nbReservations = val);
    this._reservationService.reservationsJoueur$.pipe(
      map(reservation => reservation.filter(resa => resa.uidJoueur === localStorage.getItem('application:user')))
    ).subscribe(val => {
      this.reservationsJoueur = val
    });

  }


  ngOnInit() {
    animateTabs();

    this._joueurService.value$.subscribe(
      val => {
        this.joueur = val;
      }
    )
  }

  formatX = (val) => {
    if (Number(val) === val && val % 1 === 0) {
      return val;
    }
    return '';
  }

  formatReservation(reservation: Reservation): string {
    return `Réservation du court n°${reservation.court} le ${moment(reservation.debut, 'YYYY/MM/DD').format("DD MMMM")} 
    de ${moment(reservation.debut, 'YYYY/MM/DD HH:mm').format("HH")}h à  ${moment(reservation.fin, 'YYYY/MM/DD HH:mm').format("HH")}h`;
  }

  deleteReservation(reservation: Reservation): void {
    this._reservationService.deleteReservation(reservation);
  }

}
