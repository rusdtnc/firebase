import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter, DateFormatterParams,
  MOMENT
} from 'angular-calendar';
import { ReservationComponent } from '../reservation/reservation.component';
import { CalendarHeaderComponent } from './calendar-header.component';
import * as moment from 'moment';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { ReservationRoutingModule } from './reservation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReservationService } from './reservation.service';
import { DayComponent } from './day.component';


export function momentAdapterFactory() {
  return adapterFactory(moment);
}

export class CustomDateFormatter extends CalendarMomentDateFormatter {

  public dayViewHour({date, locale}: DateFormatterParams): string {
    // change this to return a different date format
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {hour: 'numeric'}).format(date);
  }

}


@NgModule({
  imports: [
    SharedModule,
    ReservationRoutingModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: momentAdapterFactory
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter
        }
      }
    )
  ],
  declarations: [ReservationComponent, CalendarHeaderComponent, DayComponent],
  providers: [
    ReservationService]
})
export class ReservationModule { }
