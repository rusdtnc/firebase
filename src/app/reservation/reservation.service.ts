import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/index';
import { filter, map } from 'rxjs/internal/operators';
import { Reservation } from './reservation';
import * as moment from 'moment';
import { CalendarEventId } from '../utils/calendar-event-id';
import { ColorUtils } from '../utils/color.utils';
import { Model, ModelFactory } from 'ngx-model';
import { SnackbarService } from '../shared/snackbar/snackbar.service';

export interface ReservationModel {
  reservationsJoueur: Reservation[]
}

const initialState: ReservationModel = {
  reservationsJoueur: []
}


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private basePath = '/reservations';


  private reservations: Model<ReservationModel>;

  reservations$: Observable<ReservationModel>;
  reservationsJoueur$: Observable<Reservation[]>;
  nbReservationsJoueur$: Observable<number>;
  reservationsEvent$: Observable<any>;

  constructor(private db: AngularFireDatabase, private modelFactory: ModelFactory<ReservationModel>,
  private _snackbarService: SnackbarService) {
    this.reservations = this.modelFactory.create(initialState);
    this.reservations$ = this.reservations.data$;

    this.reservationsJoueur$ = this.reservations$.pipe(map(model => model.reservationsJoueur));
    this.nbReservationsJoueur$ = this.reservations$.pipe(map(model => {
      let nbReservationsJoueur = 0;
      model.reservationsJoueur.forEach( reservation => {
        if(reservation.uidJoueur === localStorage.getItem('application:user')) {
          nbReservationsJoueur ++;
        }
      })

      return nbReservationsJoueur;
    }));

    this.reservationsEvent$ = this.reservations$.pipe(map(changes =>
    {
      return changes.reservationsJoueur.map(reservation => {
        const eventCalendar: CalendarEventId = this.transformReservationToEventCalendar(reservation);
        if (reservation.uidJoueur === localStorage.getItem('application:user')) {
          eventCalendar.actions = [
            {
              label: '<i class="fa fa-fw fa-times"></i>',
              onClick: ({event}: { event: CalendarEventId }): void => {
                this.deleteReservation({key: event.key});
              }
            }
          ];
        }
        return eventCalendar;
      })
    }));

    this.fetchReservations();
  }

  addReservation(data) {
    const obj = this.db.database.ref(this.basePath);

    let snack = this._snackbarService;

    return obj.push(data, function (error) {
      if (error) {
        snack.addMessageError('Une erreur est survenue');
      } else {
        snack.addMessageSuccess(`Court n°${data.court} réservé le ${moment(data.debut).format('D MMM')} à ${moment(data.debut).format('HH')}h`);
      }
    });
  }


  fetchReservations(): void {
    this.db.list(this.basePath, ref => ref.orderByChild('debut').startAt(moment().format('YYYY/MM/DD HH:mm'))).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const reservation = c.payload.val() as Reservation;
          reservation.key = c.payload.key;
          return reservation;
        }))).subscribe( val => {
      const reservations = this.reservations.get();
      reservations.reservationsJoueur = val;

      this.reservations.set(reservations);
    });
  }

  deleteReservation(value) {

    let snack = this._snackbarService;

    this.db.object(`/reservations/${value.key}`).remove().then(
      function (error) {
        if (error) {
          snack.addMessageError('Une erreur est survenue');
        } else {
          snack.addMessageSuccess('Réservation annulée');
        }
      }
    );
  }

  transformReservationToEventCalendar(reservation: Reservation): CalendarEventId {
    return {
      title: reservation.designation,
      start: moment(reservation.debut, "YYYY/MM/DD HH:mm").toDate(),
      end: moment(reservation.fin, "YYYY/MM/DD HH:mm").toDate(),
      color: ColorUtils.getColorForCourt(reservation.court),
      court: reservation.court,
      key: reservation.key
    }
  }
}
