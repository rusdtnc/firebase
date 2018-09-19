import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JoueurComponent } from './joueur.component';
const routes: Routes = [
  {
    path: '',
    component: JoueurComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class JoueurRoutingModule {}
