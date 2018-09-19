import { CalendarEvent } from 'angular-calendar';

export interface CalendarEventId extends CalendarEvent {
  court: string;
  key?: string | number;
}
