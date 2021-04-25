import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FILTER_VALUE_CHANGED } from '../app-state/app.actions';
import { AppState } from '../app-state/app.reducers';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onChange(val: string): void {
    this.store.dispatch(FILTER_VALUE_CHANGED({filter: val}));
  }

}
