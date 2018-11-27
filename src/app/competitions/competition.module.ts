
import { SharedModule } from '../shared/shared.module';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { CompetitionService } from './competition.service';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    SharedModule,
    CompetitionRoutingModule,
  ],
  declarations: [CompetitionComponent],
  providers: [
    CompetitionService]
})
export class CompetitionModule { }
