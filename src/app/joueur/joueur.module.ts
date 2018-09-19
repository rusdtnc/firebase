import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JoueurRoutingModule } from './joueur-routing.module';
import { JoueurComponent } from './joueur.component';

@NgModule({
  imports: [
    SharedModule,
    JoueurRoutingModule
  ],
  declarations: [JoueurComponent]
})
export class JoueurModule { }
