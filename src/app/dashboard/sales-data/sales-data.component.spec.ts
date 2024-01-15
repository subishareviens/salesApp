import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDataComponent } from './sales-data.component';

describe('SalesDataComponent', () => {
  let component: SalesDataComponent;
  let fixture: ComponentFixture<SalesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
