import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCustomerDataComponent } from './monitor-customer-data.component';

describe('MonitorCustomerDataComponent', () => {
  let component: MonitorCustomerDataComponent;
  let fixture: ComponentFixture<MonitorCustomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorCustomerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorCustomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
