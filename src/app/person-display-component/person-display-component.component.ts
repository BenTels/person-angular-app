import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PartialObserver, Subscription } from 'rxjs';
import { getSelectedPerson } from '../app-state/app.reducers';
import { Person } from '../person/person';
import { TEST_PERSONS } from '../TEMPORARY_TEST_PERSONS';

@Component({
  selector: 'app-person-display-component',
  templateUrl: './person-display-component.component.html',
  styleUrls: ['./person-display-component.component.css']
})
export class PersonDisplayComponentComponent implements OnInit, OnDestroy {

  person?: Person;
  subscription?: Subscription;


  constructor(private store: Store<Person>) { }

  ngOnInit(): void {
    const obs: PartialObserver<Person|undefined> = {
      next: (p: Person|undefined) => this.person = p
    };

    this.store.select(getSelectedPerson).subscribe(obs);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
