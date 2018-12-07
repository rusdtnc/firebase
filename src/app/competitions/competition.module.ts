import { SharedModule } from '../shared/shared.module';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { CompetitionService } from './competition.service';
import { NgModule } from '@angular/core';
import { DetailCompetitionComponent } from './detail/detail-competition.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ScoreCompetitionComponent } from './score/score-competition.component';
import { JourneeCompetitionComponent } from './journee/journee-competition.component';
import { ClasssementCompetitionComponent } from './classement/classement-competition.component';
import { TableauCompetitionComponent } from './tableau/tableau-competition.component';
@NgModule({
  imports: [
    NgxChartsModule,
    SharedModule,
    CompetitionRoutingModule,
  ],
  declarations: [
    CompetitionComponent,
    DetailCompetitionComponent,
    ScoreCompetitionComponent,
    JourneeCompetitionComponent,
    ClasssementCompetitionComponent,
    TableauCompetitionComponent
  ],
  providers: [
    CompetitionService]
})
export class CompetitionModule { }
