import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompetitionComponent } from './competition.component';
const routes: Routes = [
  {
    path: '',
    component: CompetitionComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CompetitionRoutingModule {
}
