import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoItem } from './ingreso-item';

describe('IngresoItem', () => {
  let component: IngresoItem;
  let fixture: ComponentFixture<IngresoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
