import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReservationService } from '../reservation/reservation.service';
import { AngularFireStorage } from 'angularfire2/storage';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {l

  nbReservations: number;

  constructor(public authService: AuthService, private _reservationService: ReservationService, public storage: AngularFireStorage) { }

  ngOnInit() {
    this._reservationService.nbReservationsJoueur$.subscribe(val => this.nbReservations = val);

    $('body').tooltip({
      selector: '.mytool',
      trigger : 'hover'
    })
  }
}
