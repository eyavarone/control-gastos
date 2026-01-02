import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoItem } from './gasto-item';

describe('GastoItem', () => {
  let component: GastoItem;
  let fixture: ComponentFixture<GastoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
