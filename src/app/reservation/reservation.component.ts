import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import * as moment from 'moment';
import { ReservationService } from './reservation.service';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/index';
import { JoueurService } from '../joueur/joueur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from './reservation';
import { AuthService } from '../auth.service';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
declare var $: any;

// weekStartsOn option is ignored when using moment, as it needs to be configured globally for the moment locale
moment.updateLocale('fr', {
  week: {
    dow: DAYS_OF_WEEK.MONDAY,
    doy: 0
  }
});

@Component({
  selector: 'app-reservation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReservationComponent implements OnInit {

  reservationForm: FormGroup;
  uidJoueurConnecte: any;
  view: string = 'week';
  viewDate: Date = new Date();
  reservedCourt: any[] = [];
  events$: Observable<Array<CalendarEvent<any>>>;
  selectedDayViewDate: Date;

  constructor(public reservationService: ReservationService,
              private _joueurService: JoueurService,
              private _fb: FormBuilder,
              public authService: AuthService,
              private _snackbarService: SnackbarService) {
    this.createForm();
    this._joueurService.key$.subscribe(val => this.uidJoueurConnecte = val);
    this._joueurService.value$.subscribe(val => this.reservationForm.get('joueur').setValue(`${val.nom} ${val.prenom}`));
  }

  createForm() {
    this.reservationForm = this._fb.group({
      'joueur': ['', Validators.required],
      'court': ['', Validators.required]
    });

    this.reservationForm.get('joueur').disable();
  }

  ngOnInit(): void {
    this.events$ = this.reservationService.reservationsEvent$;

    this._joueurService.getJoueurs().pipe(
      map(datas => datas.map(
        data => ({
          id: data.key,
          name: `${data.nom} ${data.prenom}`
        }))
      )).subscribe(
      val => {
        $(".typeahead").typeahead({
          source: val,
          autoSelect: true
        }, 'json');
      }
    );

    $(document).ready(function () {
      $('#mySelect').selectpicker();
    });


  }

  /**
   * ouverture de la popup de réservation sur clic dun segment heure
   * @param date
   */
  hourSegmentClicked(event: any): void {
    if (moment().isBefore(event.date)) {

      this.selectedDayViewDate = event.date;


      this.reservationService.reservationsJoueur$.pipe(
        map(reservation => {
          return reservation
            .filter(event => (moment(event.debut, 'YYYY/MM/DD HH:mm').isSame(this.selectedDayViewDate, 'hours')))
            .map(data => {
              return {court: data.court, joueur: data.uidJoueur}
            });
        })
      ).subscribe(val => {
        this.reservedCourt = val;
      });


      if(this.reservedCourt.map(reservation => reservation.joueur).includes(this.uidJoueurConnecte)) {
        this._snackbarService.addMessageWarning('Vous avez déjà une réservation pour ce créneau')
      } else {
        if (event.court) {
          this.reservationForm.get('court').setValue(event.court);
        }

        $('#exampleModalCenter').modal('toggle');
      }
    }
  }

  /**
   * Formattage date de réservation
   * @returns {string}
   */
  getDateReservation(): string {
    return moment(this.selectedDayViewDate).format('DD/MM/YYYY');
  }

  /**
   * Formattage heure de reservation
   * @returns {string}
   */
  getHeureReservation(): string {
    return moment(this.selectedDayViewDate).format('HH:mm');
  }

  /**
   * Sauvegarde de la réservation
   */
  saveReservation(): void {
    let reservation = new Reservation(
      `Réservation ` + this.reservationForm.get('joueur').value,
      moment(this.selectedDayViewDate).format('YYYY/MM/DD HH:mm'),
      moment(this.selectedDayViewDate).add(1, 'h').format('YYYY/MM/DD HH:mm'),
      this.reservationForm.get('court').value,
      this.uidJoueurConnecte
    );

    this.reservationForm.get('court').reset();

    this.reservationService.addReservation(reservation);

    $('#exampleModalCenter').modal('toggle');
  }

  /**
   * Mise à jour du court sélectionné pour réservation
   * @param event
   */
  onSelect(event) {
    this.reservationForm.get('court').setValue(event.target.value);
  }

  /**
   * Court sélectionné pour réservation
   * @param val
   * @returns {boolean}
   */
  isSelected(court: string): boolean {
    return (this.reservationForm.get('court').value === court);
  }

  /**
   * Court réservé
   * @param val
   * @returns {any}
   */
  isReserved(court: string): boolean {
    if (!this.processInfos()) {
      return (this.reservedCourt.map(reservation => reservation.court).includes(court));
    }
    return false;
  }

  /**
   * Calcul des disponibilités en court
   * @returns {boolean}
   */
  processInfos(): boolean {
    return this.reservedCourt == null;
  }

  /**
   * Aucun terrain de disponible
   * @returns {any|boolean}
   */
  zeroDispo(): boolean {
    return this.isReserved('1') && this.isReserved('2') && this.isReserved('3') && this.isReserved('4') && this.isReserved('5') && this.isReserved('6') && this.isReserved('7') && this.isReserved('8');
  }

  /**
   * Affichage des reservations par court
   * @param value
   */
  filterByCourt(value): void {
    this.events$ = this.reservationService.reservationsEvent$.pipe(
      map(event => {
        return event.filter(event => (!!!value || event.court === value));
      })
    );
  }

  beforeWeekViewRender(event): void {
    event.header.forEach(header => {
      if (header.isPast) {
        header.cssClass = 'cal-disabled';
      }
    });

    event.hourColumns.forEach(column => {
      column.hours.forEach(hour => {
        if (moment().isAfter(hour.segments[0].date)) {
          hour.segments[0].cssClass = 'cal-disabled-seg';
        }

      })
    })
  }

  beforeMonthViewRender({body}: { body: any[] }): void {
    body.forEach(day => {
      if (moment(day.date).isBefore(moment().subtract(1, 'days'))) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

  beforeDayViewRender(event) {
    event.body.hourGrid.forEach(hour => {
      if (moment().isAfter(hour.segments[0].date)) {
        hour.segments[0].cssClass = 'cal-disabled';
      }
    });
  }

  deleteClicked(event) {
    this.reservationService.deleteReservation(event);
  }
}
