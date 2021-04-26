import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Person } from '../person/person';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getPersonById } from '../app-state/app.reducers';
import { PersonService } from '../person/person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit, OnDestroy {

  person?: any;
  personSubscription?: Subscription;
  paramSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router : Router ,private loc: Location, private store: Store<AppState>, private personService: PersonService) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(
      (par: Params) => {
        let id = par['id'];
        if (id) {
          this.personSubscription?.unsubscribe();
          this.personSubscription = this.store.select(getPersonById, { id: id }).subscribe(
            {
              next: (p: Person | undefined) => {
                if (p) {
                  this.person = p.toEditableObject();
                }
              }
            });
        }
      }
    );
  }

  ngOnDestroy() {
    this.paramSubscription?.unsubscribe();
    this.personSubscription?.unsubscribe();
  }

  updatePerson(): void {
    let p: Person = Person.fromEditState(this.person);
    this.personService.updateExistingPerson(p,
      (id: string) => {
        this.router.navigate(['display', id]);
      });
  }

  editCancelled(): void {
    this.loc.back();
  }

  resetPersonState() {
    this.person = undefined;
  }
}
