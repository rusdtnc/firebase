import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs/index';
import { distinctUntilChanged, map } from 'rxjs/internal/operators';
export interface SnackbarMessages {
  success: string,
  error: string
}

const initialState: SnackbarMessages = {
  success: null,
  error: null
}


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {


  private messages: Model<SnackbarMessages>;

  messages$: Observable<SnackbarMessages>;
  successMessage$: Observable<string>;
  errorMessage$: Observable<string>;

  constructor(private modelFactory: ModelFactory<SnackbarMessages>) {
    this.messages = this.modelFactory.create(initialState);
    this.messages$ = this.messages.data$;

    this.successMessage$ = this.messages$.pipe(map(messages => messages.success), distinctUntilChanged());
    this.errorMessage$ = this.messages$.pipe(map(messages => messages.error), distinctUntilChanged());
  }


  addMessageSuccess(message: string): void {
    const messages = this.messages.get();
    messages.success = message;
    this.messages.set(messages);

    this.resetMessages();
  }

  addMessageError(message: string): void {
    const messages = this.messages.get();
    messages.error = message;
    this.messages.set(messages);

    this.resetMessages();
  }

  private resetMessages(): void {
    setTimeout(() => {
      const messages = this.messages.get();
      messages.success = null;
      messages.error = null;
      this.messages.set(messages);
    }, 3000);
  }
}
