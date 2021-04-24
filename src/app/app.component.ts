import { Component, OnInit } from '@angular/core';
import { PersonService } from './person/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'person-angular-app';
  
  constructor (private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getPersonsList();
  }


}
