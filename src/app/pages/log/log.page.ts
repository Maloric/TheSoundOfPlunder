import { Component, OnInit } from '@angular/core';

import { LogViewModel } from './log.viewmodel';

@Component({
    selector: 'app-log-page',
    templateUrl: './log.page.html',
    styleUrls: ['./log.page.scss']
})
export class LogPageComponent {

    constructor(private viewModel: LogViewModel) { }

}
