import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CompetitionService } from './competition.service';
@Component({
  selector: 'app-competition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'competition.component.html',
  styleUrls: ['./competition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {

  result;

  constructor(private competitionService: CompetitionService) {}

  ngOnInit() {
    this.competitionService.getCompetitions();
  }
}
