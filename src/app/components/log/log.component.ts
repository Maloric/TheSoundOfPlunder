import { OnChanges } from '@angular/core/core';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnChanges {
  @Input() tweets: any[];

  constructor() {

  }

  ngOnChanges(x: any): void {
    // console.log('ngOnChanges', x);
  }
}
