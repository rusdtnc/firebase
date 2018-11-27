import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JoueurRoutingModule } from './joueur-routing.module';
import { JoueurComponent } from './joueur.component';
import { JoueurBouchonService } from './joueur.bouchoon.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    NgxChartsModule,
    SharedModule,
    JoueurRoutingModule
  ],
  declarations: [JoueurComponent],
  providers : [JoueurBouchonService]
})
export class JoueurModule { }
