import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PERSON_REDUCER_TOKEN_ADDED, PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT, PERSON_REDUCER_TOKEN_REMOVED, PERSON_REDUCER_TOKEN_UPDATED } from '../app-state/app.actions';
import { AppState, getFilterValue } from '../app-state/app.reducers';
import { Person } from './person';


@Injectable({
  providedIn: 'root'
})
export class PersonService implements OnDestroy {

  static SERVICE_URI: string = 'http://localhost:8080/persons';

  searchTerm: string = '';
  subscription?: Subscription

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.subscription =
      this.store.select(getFilterValue)
        .pipe(debounceTime(500))
        .subscribe(
          {
            next: (fVal: string | undefined) => {
              this.searchTerm = (fVal ? fVal : '');
              this.getPersonsList();
            }
          }
        );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getPersonsList(): void {
    let options: any = {
      observe: 'body',
      responseType: 'json',
      params: (this.searchTerm !== '' ? { 'searchTerm': this.searchTerm } : undefined)
    };
    this.store.dispatch(PERSON_REDUCER_TOKEN_INIT());
    this.http.get<any[]>(PersonService.SERVICE_URI, options)
      .subscribe(
        (resp) => {
          let persList: any[] = resp as unknown as any[];
          let persons: Person[] = persList.map((p: any) => Person.fromObject(p));
          this.store.dispatch(PERSON_REDUCER_TOKEN_FETCHED({ persons: persons }));
        }
      );
  }

  getPerson(resource: string, onSuccess: (person: Person) => void) {
    this.http.get<any>(resource, { observe: 'body', responseType: 'json' })
      .subscribe(
        (resp) => {
          let pers: any = resp as unknown as any;
          let person: Person = Person.fromObject(pers);
          onSuccess(person);
        }
      );
  }

  saveNewPerson(p: Person, onSuccess: (id?: string) => void) {
    this.http.post(PersonService.SERVICE_URI,
      p.toJSONString(),
      {
        headers: { 'Content-Type': 'application/json' },
        observe: 'response'
      }).subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.ok) {
            onSuccess();
          } else {
            console.log(resp);
          }
        }
      );
  }

  updateExistingPerson(person: Person, onSuccess: (id: string) => void) {
    this.http.put(PersonService.SERVICE_URI + '/' + person.id,
      person.toJSONString(),
      { observe: 'response', headers: { 'Content-Type': 'application/json' } }
    ).subscribe(
      (resp: HttpResponse<any>) => {
        if (resp.ok) {
          onSuccess(person.id);
        } else {
          console.log(resp);
        }
      }
    );
  }

  deletePerson(person: Person, onSucces: () => void) {
    this.http.delete(PersonService.SERVICE_URI + '/' + person.id, { observe: 'response' })
      .subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.ok) {
            onSucces();
          } else {
            console.log(resp);
          }
        }
      )
  }
}
