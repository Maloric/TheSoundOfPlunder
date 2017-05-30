import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignalRService } from 'app/services/signalr/signalrService';
import { AppState } from 'app/app.state';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  @ViewChild('searchTerms')
  private searchTerms: ElementRef;

  @Output() onTextChanged = new EventEmitter<string>();

  constructor(private signalRService: SignalRService) {

  }

  ngOnInit() {
  }

  textChanged() {
    this.onTextChanged.emit(this.searchTerms.nativeElement.value);
  }

}
