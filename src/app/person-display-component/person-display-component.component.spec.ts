import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDisplayComponentComponent } from './person-display-component.component';

describe('PersonDisplayComponentComponent', () => {
  let component: PersonDisplayComponentComponent;
  let fixture: ComponentFixture<PersonDisplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDisplayComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
