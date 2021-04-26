import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PERSON_REDUCER_TOKEN_ADDED, PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_INIT, PERSON_REDUCER_TOKEN_REMOVED } from '../app-state/app.actions';
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

  saveNewPerson(p: Person, onSuccess: (id?: string) => void) {
    this.http.post(PersonService.SERVICE_URI,
      p.toJSONString(),
      {
        headers: { 'Content-Type': 'application/json' },
        observe: 'response'
      }).subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.ok) {
            let uri: string = resp.headers.get('Location')!;
            let id = uri.substr(uri.lastIndexOf('/') + 1);
            p = p.copy({ id: id });
            this.store.dispatch(PERSON_REDUCER_TOKEN_ADDED({ added: p }));
            onSuccess();
          } else {
            console.log(resp);
          }
        }

      );
  }

  deletePerson(person: Person, onSucces: () => void) {
    this.http.delete(PersonService.SERVICE_URI + '/' + person.id, {observe : 'response'})
    .subscribe(
      (resp: HttpResponse<any>) => {
        if (resp.ok) {
          this.store.dispatch(PERSON_REDUCER_TOKEN_REMOVED({removed: person}));
          onSucces();
        } else {
          console.log(resp);
        }
      }
    )
  }
}
