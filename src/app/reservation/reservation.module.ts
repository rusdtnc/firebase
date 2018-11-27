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
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { ReservationRoutingModule } from './reservation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReservationService } from './reservation.service';
import { DayComponent } from './day.component';
import * as moment from 'moment';


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

  public  monthViewTitle({ date, locale }: DateFormatterParams): string {
    return moment(date).format('MMMM YYYY').charAt(0).toUpperCase() + moment(date).format('MMMM YYYY').slice(1)
  }

  public weekViewTitle({ date, locale, weekStartsOn, excludeDays, daysInWeek }: DateFormatterParams): string {
    return `Du ${moment(date).startOf('week').format('DD')} au ${moment(date).endOf('week').format('DD MMMM YYYY')}`;
  }

  public  dayViewTitle({ date, locale }: DateFormatterParams): string {
    return moment(date).format('dddd').charAt(0).toUpperCase() + moment(date).format('dddd DD MMMM YYYY').slice(1)
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
