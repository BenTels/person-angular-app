import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { PartialObserver, Subscription } from 'rxjs';
import { getPersonById } from '../app-state/app.reducers';
import { Person } from '../person/person';
import { PersonService } from '../person/person.service';

@Component({
  selector: 'app-person-display-component',
  templateUrl: './person-display-component.component.html',
  styleUrls: ['./person-display-component.component.css']
})
export class PersonDisplayComponentComponent implements OnInit, OnDestroy {

  person?: Person;
  personSubscription?: Subscription;
  paramSubscription?: Subscription;

  constructor(private store: Store<Person>, private personService: PersonService, private route: ActivatedRoute, private loc: Location) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(
      (par: Params) => {
        let id = par['id'];
        if (id) {
          this.personSubscription?.unsubscribe();
          this.personSubscription = this.store.select(getPersonById, {id : id}).subscribe(
            {
              next: (p: Person|undefined) => { 
                this.person = p; 
              }
            });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.personSubscription?.unsubscribe();
  }

  deletePerson(): void {
    if (this.person) {
      this.personService.deletePerson(this.person, () => { this.loc.back()});
    }
  }
}

