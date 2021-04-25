import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  constructor(private loc: Location) { }

  ngOnInit(): void {
  }

  newPersonCancelled(): void {
    this.loc.back();
  }
}
