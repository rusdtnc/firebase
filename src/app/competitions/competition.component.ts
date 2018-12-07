import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CompetitionService } from './competition.service';
declare var $: any;

@Component({
  selector: 'app-competition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'competition.component.html',
  styleUrls: ['./competition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {

  constructor(public _competitionService: CompetitionService) {}

  ngOnInit() { }
}
