import { OnChanges } from '@angular/core/core';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, OnChanges {
  @Input() lastMsg: any;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('test');
  }



}
