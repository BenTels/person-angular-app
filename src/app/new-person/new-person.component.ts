import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Person } from '../person/person';
import { PersonService } from '../person/person.service';
import { TEST_PERSONS } from '../TEMPORARY_TEST_PERSONS';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  // person: any = TEST_PERSONS[1].toEditableObject();
  person: any;

  constructor(private loc: Location, private personService: PersonService) {
    this.resetPersonState();
   }

  ngOnInit(): void {
  }

  newPersonSaved(): void {
    let p: Person = Person.fromEditState(this.person);
    this.personService.saveNewPerson(p, 
      (id?: string) => {
        this.resetPersonState();
        this.loc.back();
    });
  }

  newPersonCancelled(): void {
    this.loc.back();
    this.resetPersonState();
  }

  resetPersonState(): void {
    this.person = Person.blankEditableObject();
  }
}
