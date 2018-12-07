import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';
declare var $: any;
import { HostListener } from '@angular/core'

@Component({
  selector: 'calendar-header',
  template: `
    <div class="row text-center">
      <div class="col-md-4">
        <div class="btn-group">
          <button
            [disabled]="displayBack()"
            class="btn btn-secondary"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            <i class="fas fa-arrow-left"></i>
          </button >
          <button
            class="btn btn-outline-secondary"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            Aujourd'hui
          </button >
          <button
            class="btn btn-secondary"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            <i class="fas fa-arrow-right"></i>
          </button >
        </div>
      </div>
      <div class="col-md-4">
        <h4 style="font-weight: 700">{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h4>
      </div>
      <div class="col-md-4 d-none d-md-block">
        <div class="btn-group">
          <div
            class="btn btn-secondary"
            (click)="viewChange.emit('month')"
            [class.active]="view === 'month'">
            Mois
          </div>
          <div
            class="btn btn-secondary"
            (click)="viewChange.emit('week')"
            [class.active]="view === 'week'">
            Semaine
          </div>
          <div
            class="btn btn-secondary"
            (click)="viewChange.emit('day')"
            [class.active]="view === 'day'">
            Jour
          </div>
        </div>
      </div>
      <div class="col-md-4  d-md-none d-block">
        <button type="button" class="btn btn-outline-primary datepicker"><i class="far fa-calendar-alt"></i></button>
      </div>
    </div>
    <br>
   
  `
})
export class CalendarHeaderComponent implements  OnInit, OnChanges {
  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale: string = 'en';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();


  displayBack(): boolean {
    return ((this.view === 'week' && moment(this.viewDate).startOf('week').isBefore(moment())) || (this.view === 'month' && moment(this.viewDate).startOf('month').isBefore(moment())) || moment().isSame(this.viewDate,'day'));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    if(event.target.innerWidth < 768) {
      this.viewChange.emit('day');
    }
  }

  datepicker: any;

  ngOnInit() {

    if(window.innerWidth < 768) {
      this.viewChange.emit('day');
    }

    var self = this;

    this.datepicker = $('.datepicker');

    this.datepicker.datepicker({
      startDate: moment().format('DD/MM/YYYY'),
      language: "fr",
      maxViewMode: 1,
      autoclose: true,
      orientation: "bottom left",
      todayHighlight: true
    }).on('changeDate', function(event) {
      self.viewChange.emit('day');
      self.viewDateChange.emit(event.date);
    });
  }

  ngOnChanges(changes) {
    if(changes.viewDate && this.datepicker) {
      this.datepicker.datepicker('update', changes.viewDate.currentValue);
    }
  }



}
