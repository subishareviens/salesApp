import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAllocationComponent } from './product-allocation.component';

describe('ProductAllocationComponent', () => {
  let component: ProductAllocationComponent;
  let fixture: ComponentFixture<ProductAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
