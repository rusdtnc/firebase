import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/home/home.module#HomeModule'
      },
      {
        path: 'reservations',
        loadChildren: 'app/reservation/reservation.module#ReservationModule'
      },
      {
        path: 'joueurs',
        loadChildren: 'app/joueur/joueur.module#JoueurModule'
      },
      {
        path: 'competitions',
        loadChildren: 'app/competitions/competition.module#CompetitionModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule {
}
