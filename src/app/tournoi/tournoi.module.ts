import { NgModule } from '@angular/core';

import { TournoiRoutingModule } from './tournoi-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TournoiComponent } from './tournoi.component';

@NgModule({
  imports: [
    SharedModule,
    TournoiRoutingModule
  ],
  declarations: [TournoiComponent]
})
export class TournoiModule { }
