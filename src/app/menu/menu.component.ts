import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReservationService } from '../reservation/reservation.service';
import { RouterOutlet } from '@angular/router';
import { RouterAnimations } from '../utils/animation';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ RouterAnimations.routerSlide ]
})
export class MenuComponent implements OnInit {l

  nbReservations: number;

  constructor(public authService: AuthService,
              private _reservationService: ReservationService) { }

  ngOnInit() {
    this._reservationService.nbReservationsJoueur$.subscribe(val => this.nbReservations = val);

    $('body').tooltip({
      selector: '.mytool',
      trigger : 'hover'
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation;
  }
}
