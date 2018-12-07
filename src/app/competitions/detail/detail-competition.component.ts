import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CompetitionService } from '../competition.service';
import { animateTabs } from '../../utils/animation';
import { primary, secondary } from '../../utils/color.utils';
declare var $: any;

@Component({
  selector: 'app-competition-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'detail-competition.component.html',
  styleUrls: ['./detail-competition.component.scss']
})
export class DetailCompetitionComponent implements OnInit, OnDestroy {


  scheme = {
    domain: [primary, secondary]
  }

  constructor(public _competitionService: CompetitionService) {}

  ngOnInit(): void {
    animateTabs();
  }

  ngOnDestroy(): void {
    this._competitionService.reset();
  }
}
