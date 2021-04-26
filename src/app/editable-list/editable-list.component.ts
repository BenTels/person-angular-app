import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: ['./editable-list.component.css']
})
export class EditableListComponent implements OnInit {

  @Input() list: string[] = [];
  @Input() dataHTMLType: string = 'text'; 

  constructor() { }

  ngOnInit(): void {
  }

  addElement() {
    this.list.push('');
  }

  trackByFn(index: number, item: any): number {
    return index;  
  }
}
