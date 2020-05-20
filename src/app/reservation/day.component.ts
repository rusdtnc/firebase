import {
  AfterContentChecked,
  AfterViewChecked, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnChanges, OnInit {

  @Input() reservation;
  @Input() viewDate;
  @Output() hourSegmentClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();

  reservationGrille = new Array();

  constructor() {}

  private resetGrille(): void {
    // on cree les lignes (tableau vert) les unes après les autres
    for(var i=0; i<8; i++)
      this.reservationGrille[i] = new Array();


    // on parcourt les lignes...
    for(var i=0; i<8; i++)
      // ... et dans chaque ligne, on parcourt les cellules
      for(var j=0; j<13; j++)
        this.reservationGrille[i][j] = null;
  }

  ngOnInit() {
    $('body').tooltip({
      selector: '.reservation',
      trigger : 'hover'
    })
  }

  getReservation(court, heure)  {
    return this.reservationGrille[court-1][heure-8];
  }

  addReservation(court, heure) {
    this.hourSegmentClicked.emit({date: moment(this.viewDate).hours(heure).minute(0), court: court});
  }

  ngOnChanges(changes) {

    if(changes && this.viewDate) {
      this.resetGrille();
      this.reservation.filter(resa => {
        return (moment(this.viewDate).isSame(moment(resa.start),'day'))
      }).map(data => {
        this.reservationGrille[data.court - 1][moment(data.start).hour()-8] = data;
      });
    }



  }

  deleteReservation(court, heure) {
    this.deleteClicked.emit({key: (this.reservationGrille[court - 1][heure-8]).key});
  }

  isDisabled(heure) {
    return !moment().isBefore(moment(this.viewDate).hours(heure));
  }

  getTitle(court, heure): string {
    if(this.reservationGrille[court-1][heure-8]){
      return (this.reservationGrille[court-1][heure-8]).title;
    }
  }
}
