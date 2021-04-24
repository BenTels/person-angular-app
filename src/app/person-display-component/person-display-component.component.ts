import { Component, OnInit } from '@angular/core';
import { Person } from '../person/person';
import { TEST_PERSONS } from '../TEMPORARY_TEST_PERSONS';

@Component({
  selector: 'app-person-display-component',
  templateUrl: './person-display-component.component.html',
  styleUrls: ['./person-display-component.component.css']
})
export class PersonDisplayComponentComponent implements OnInit {

  person: Person = TEST_PERSONS[1];

  constructor() { }

  ngOnInit(): void {
  }

}
