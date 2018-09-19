import { NgModule } from '@angular/core';

import { AuthentificationRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    AuthentificationRoutingModule
  ],
  declarations: [LoginComponent]
})
export class AuthentificationModule { }
