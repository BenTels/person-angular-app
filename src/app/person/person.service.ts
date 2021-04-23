import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TEST_PERSONS } from '../TEMPORARY_TEST_PERSONS';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  getPersonsList(): Observable<Person[]> {
    return of(TEST_PERSONS);
  } 

}
