import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { JoueurService } from './joueur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/reservation';
import * as moment from 'moment';
import { multi, single } from './joueur.data';
import { Single } from '../utils/graph';
declare var $: any;

moment.locale('fr');

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.scss']
})
export class JoueurComponent implements OnInit {

  single = single;
  multi = multi;

  victoiresDefaites: Single[] = [];

  viewVd =[300,150];
  view =[700,300];

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

  _joueurForm: FormGroup;

  _joueur: any;

  nbReservations: number;
  reservationsJoueur= [];
  success: boolean;

  scheme = {
    domain: ['#327262', '#d37a46']
  }


  constructor( private _fb: FormBuilder,
               public _joueurService: JoueurService,
               private _reservationService: ReservationService,
               private  _cr : ChangeDetectorRef) {
    this.createForm();

    this._reservationService.nbReservationsJoueur$.subscribe(val => this.nbReservations = val);
    this._reservationService.reservationsJoueur$.pipe(
      map(reservation => reservation.filter(resa => resa.uidJoueur === localStorage.getItem('application:user')))
    ).subscribe(val => {
      this.reservationsJoueur = val
    });

  }

  disabled() {
    return this._joueurForm.pristine || this._joueurForm.invalid;
  }

  ngOnInit() {
    this._joueurService.value$.subscribe(
      val => {
        this._joueur = val;
        this._joueurForm.patchValue(val, {emitEvent: false});
      }
    )


  }

  formatX = (val) => {
    if(Number(val) === val && val % 1 === 0) {
      return val;
    }
    return '';
  }

  createForm() {
    this._joueurForm = this._fb.group({
      'nom': ['', Validators.required],
      'prenom': ['', Validators.required],
      'classement': [''],
      'licence': ['']
    });
  }

  formatReservation(reservation: Reservation): string {
    return `Réservation du court n°${reservation.court} le ${moment(reservation.debut,'YYYY/MM/DD').format("DD MMMM")} 
    de ${moment(reservation.debut, 'YYYY/MM/DD HH:mm').format("HH")}h à  ${moment(reservation.fin, 'YYYY/MM/DD HH:mm').format("HH")}h`;
  }

  deleteReservation(reservation: Reservation): void {
    this._reservationService.deleteReservation(reservation);
  }

}
