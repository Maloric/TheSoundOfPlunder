import { Component, OnInit } from '@angular/core';

import { AppState } from '../../app.state';
import { LogViewModel } from './log.viewmodel';

@Component({
    selector: 'app-log-page',
    templateUrl: './log.page.html',
    styleUrls: ['./log.page.scss']
})
export class LogPageComponent implements OnInit {

    constructor(private viewModel: LogViewModel) {
    }

    ngOnInit() {
    }

}
