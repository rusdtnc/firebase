import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { JoueurService } from './joueur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/reservation';
import * as moment from 'moment';
declare var $: any;

moment.locale('fr');

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.scss']
})
export class JoueurComponent implements OnInit {

  _joueurForm: FormGroup;

  classement: string;
  nbReservations: number;
  reservationsJoueur= [];
  success: boolean;


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
        this._joueurForm.patchValue(val, {emitEvent: false});
        this.classement = val.classement;
      }
    )

  }

  createForm() {
    this._joueurForm = this._fb.group({
      'nom': ['', Validators.required],
      'prenom': ['', Validators.required],
      'classement': [''],
      'licence': ['']
    });
  }

  isSelected(classement:string): boolean {
    return this.classement === classement;
  }

  update() {
    this._joueurService.updateJoueur(this._joueurForm.getRawValue()).then(() => this._joueurForm.markAsPristine());
  }

  formatReservation(reservation: Reservation): string {
    return `Réservation du court n°${reservation.court} le ${moment(reservation.debut,'YYYY/MM/DD').format("DD MMMM")} 
    de ${moment(reservation.debut, 'YYYY/MM/DD HH:mm').format("HH")}h à  ${moment(reservation.fin, 'YYYY/MM/DD HH:mm').format("HH")}h`;
  }

  deleteReservation(reservation: Reservation): void {
    this._reservationService.deleteReservation(reservation);
  }

}
