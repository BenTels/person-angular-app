import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  getPersonState, PersonsState, PERSON_STATE_ERROR, PERSON_STATE_LOADED, PERSON_STATE_LOADING } from '../app-state/app.reducers';
import { Person } from '../person/person';
import { PartialObserver, Subscription } from 'rxjs';
import { PERSON_SELECTED } from '../app-state/app.actions';

@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.css']
})
export class NavigationComponentComponent implements OnInit, OnDestroy {

  persons?: Person[];
  message?: string;
  subscription?: Subscription;

  constructor(private store: Store<PersonsState>) { }

  personClicked(personId: string) {
    let p: Person|undefined = this.persons?.find((pp:Person) => pp.id === personId)!;
    this.store.dispatch(PERSON_SELECTED({person: p}));
    console.log('Clicked person with id ' + personId);
  }

  ngOnInit(): void {
    const obs: PartialObserver<PersonsState> = this.personStateObserver;
    this.subscription = this.store.select(getPersonState).subscribe(obs);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  personStateObserver: PartialObserver<PersonsState> = {
    next: (ps: PersonsState) => {
      if (ps) {
        if (ps.loadstate === PERSON_STATE_LOADED) {
          this.persons = ps.allPersons;
          this.message = undefined;
        }
        if (ps.loadstate === PERSON_STATE_ERROR) {
          this.persons = undefined;
          this.message = ps.message;
        }
        if (ps.loadstate === PERSON_STATE_LOADING) {
          this.persons = undefined;
          this.message = 'Loading...';
        }
      } else {
        this.message = 'Loading...';
      }
    },

    error: (err: any) => {
      this.persons = undefined;
      this.message = err;
    },

    complete: () => {
      this.persons = undefined;
      this.message = 'Goodbye, world!'
    }
  }
}