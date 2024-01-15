import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerpageTitleComponent } from './innerpage-title.component';

describe('InnerpageTitleComponent', () => {
  let component: InnerpageTitleComponent;
  let fixture: ComponentFixture<InnerpageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerpageTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerpageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
