import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TEST_PERSONS } from '../TEMPORARY_TEST_PERSONS';
import { PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT } from '../app-state/app.actions'
import { PersonsState } from '../app-state/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private store: Store<PersonsState>) { }

  getPersonsList(): void {
    this.store.dispatch(PERSON_REDUCER_TOKEN_INIT());
    setTimeout(
      () => {
        console.log('Service says hello');
        this.store.dispatch(PERSON_REDUCER_TOKEN_FETCHED({persons: TEST_PERSONS}));
      },
      5000
    );
  } 

}
