import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  constructor(private route: ActivatedRoute, private loc: Location) { }

  ngOnInit(): void {
  }

  editCancelled(): void {
    this.loc.back();
  }
}
