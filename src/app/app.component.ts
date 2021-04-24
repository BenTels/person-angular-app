import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT } from './person/person-actions';
import { PersonState } from './person/persons-reducer';
import { TEST_PERSONS } from './TEMPORARY_TEST_PERSONS';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'person-angular-app';
  
  constructor (private store: Store<{ps: PersonState}>) {}

  ngOnInit(): void {
    this.store.dispatch(PERSON_REDUCER_TOKEN_INIT());
    setTimeout(() => { 
      this.store.dispatch(PERSON_REDUCER_TOKEN_FETCHED({persons: TEST_PERSONS}));
    }, 5000);
  }


}
