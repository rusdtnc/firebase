import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forme',
  templateUrl: 'forme.component.html',
  styleUrls: ['./forme.component.scss']
})
export class FormeComponent {

  @Input() resultats: string[];

}
