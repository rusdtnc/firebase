import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MODEL_PROVIDER } from 'ngx-model';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from './snackbar/snackbar.service';
import { ErrorMessageComponent } from './error-messagae/error-message.component';
import { HttpClientModule } from '@angular/common/http';
const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ANGULAR_MODULES
  ],
  declarations: [
    SnackbarComponent,
    ErrorMessageComponent
  ],
  exports: [
    CommonModule,
    SnackbarComponent,
    ErrorMessageComponent,
    ANGULAR_MODULES
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MODEL_PROVIDER,
        SnackbarService
      ]
    };
  }
}
