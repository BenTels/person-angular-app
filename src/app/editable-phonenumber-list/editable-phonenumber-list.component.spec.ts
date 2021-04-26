import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablePhonenumberListComponent } from './editable-phonenumber-list.component';

describe('EditablePhonenumberListComponent', () => {
  let component: EditablePhonenumberListComponent;
  let fixture: ComponentFixture<EditablePhonenumberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditablePhonenumberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablePhonenumberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
