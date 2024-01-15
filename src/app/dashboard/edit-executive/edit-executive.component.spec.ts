import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExecutiveComponent } from './edit-executive.component';

describe('EditExecutiveComponent', () => {
  let component: EditExecutiveComponent;
  let fixture: ComponentFixture<EditExecutiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExecutiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExecutiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
