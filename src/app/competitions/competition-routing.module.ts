import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompetitionComponent } from './competition.component';
import { DetailCompetitionComponent } from './detail/detail-competition.component';
import { CompetitionResolver, DetailCompetitionResolver } from './competition.resolver';
const routes: Routes = [
  {
    path: '',
    component: CompetitionComponent,
    data: {animation: 'competitions'},
    resolve: { data: CompetitionResolver }
  },
  {
    path: ':id',
    component: DetailCompetitionComponent,
    data: {animation: 'detailCompetition'},
    resolve: { all: CompetitionResolver, detail: DetailCompetitionResolver }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers : [
    DetailCompetitionResolver,
    CompetitionResolver
  ],
  exports: [RouterModule]
})
export class CompetitionRoutingModule {
}
