import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Totalizadores } from './totalizadores';

describe('Totalizadores', () => {
  let component: Totalizadores;
  let fixture: ComponentFixture<Totalizadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Totalizadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Totalizadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
