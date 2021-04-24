import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TEST_PERSONS } from '../TEMPORARY_TEST_PERSONS';
import { PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT } from './person-actions';
import { PersonState } from './persons-reducer';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private store: Store<PersonState>) { }

  getPersonsList(): void {
    this.store.dispatch(PERSON_REDUCER_TOKEN_INIT());
    setTimeout(
      () => {
        this.store.dispatch(PERSON_REDUCER_TOKEN_FETCHED({persons: TEST_PERSONS}));
      },
      5000
    );
  } 

}
