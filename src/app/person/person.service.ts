import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT } from '../app-state/app.actions'
import { AppState, getFilterValue, PersonsState } from '../app-state/app.reducers';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Person } from './person';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


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
      params: (this.searchTerm !== '' ? { 'searchTerm' : this.searchTerm } : undefined)
    };


    this.store.dispatch(PERSON_REDUCER_TOKEN_INIT());
    this.http.get<any[]>(PersonService.SERVICE_URI, options)
      .subscribe(
        (resp) => {
          let persList: any[] = resp as unknown as any[];
          let persons: Person[] = persList.map((p:any) => Person.fromObject(p));
          this.store.dispatch(PERSON_REDUCER_TOKEN_FETCHED({persons: persons}));
        }
      );
  } 

}
