import { OnChanges } from '@angular/core/core';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  @Input() lastMsg: any;

  constructor() {

  }



}
