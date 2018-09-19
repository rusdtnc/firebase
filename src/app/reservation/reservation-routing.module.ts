import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReservationComponent } from '../reservation/reservation.component';
const routes: Routes = [
  {
    path: '',
    component: ReservationComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReservationRoutingModule {
}
