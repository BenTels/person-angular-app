import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PersonState, PERSON_STATE_ERROR, PERSON_STATE_LOADED, PERSON_STATE_LOADING } from '../person/persons-reducer';
import { Person } from '../person/person';
import { PartialObserver, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.css']
})
export class NavigationComponentComponent implements OnInit, OnDestroy {

  persons?: Person[];
  message?: string;
  subscription?: Subscription;

  constructor(private store: Store<{allPersonsReducer: PersonState}>) { }

  personClicked(personId: string) {
    console.log('Clicked person with id ' + personId);
  }

  ngOnInit(): void {
    const obs: PartialObserver<{allPersonsReducer: PersonState}> = {
      next: (value: {allPersonsReducer: PersonState}) => {
        if (value && value.allPersonsReducer) {
          let ps: PersonState = value.allPersonsReducer;
          if (ps.loadstate === PERSON_STATE_LOADED) {
            this.persons = ps.data;
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
    };
    const obs0: PartialObserver<{allPersonsReducer: PersonState}> = {
      next: (value: {allPersonsReducer: PersonState}) => {
        console.log('Got ' + JSON.stringify(value.allPersonsReducer));
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Goodbye!!!');
      }
    };


    this.subscription = this.store.subscribe(obs);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
