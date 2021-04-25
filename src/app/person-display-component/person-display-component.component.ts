import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { PartialObserver, Subscription } from 'rxjs';
import { getPersonById } from '../app-state/app.reducers';
import { Person } from '../person/person';

@Component({
  selector: 'app-person-display-component',
  templateUrl: './person-display-component.component.html',
  styleUrls: ['./person-display-component.component.css']
})
export class PersonDisplayComponentComponent implements OnInit, OnDestroy {

  person?: Person;
  personSubscription?: Subscription;
  paramSubscription?: Subscription;

  constructor(private store: Store<Person>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(
      (par: Params) => {
        let id = par['id'];
        if (id) {
          this.personSubscription?.unsubscribe();
          this.personSubscription = this.store.select(getPersonById, {id : id}).subscribe(
            {
              next: (p: Person|undefined) => { 
                console.log(p); 
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

}
