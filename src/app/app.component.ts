import { Component, OnInit } from '@angular/core';
import { PersonUpdateListenerService } from './person-update-listener.service';
import { PersonService } from './person/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'person-angular-app';
  
  constructor (private personService: PersonService,private update: PersonUpdateListenerService) {}

  ngOnInit(): void {
    this.personService.getPersonsList();
  }


}
