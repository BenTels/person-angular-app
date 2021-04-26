import { Component, Input, OnInit } from '@angular/core';
import { PhoneNumber } from '../person/phone-number';

@Component({
  selector: 'app-editable-phonenumber-list',
  templateUrl: './editable-phonenumber-list.component.html',
  styleUrls: ['./editable-phonenumber-list.component.css']
})
export class EditablePhonenumberListComponent implements OnInit {

  @Input() list: {number: string, mobile: boolean}[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addElement() {
    this.list.push(PhoneNumber.EMPTY_PHONENUMBER.toEditableObject());
  }

  trackByFn(index: number, item: any): number {
    return index;  
  }
}
