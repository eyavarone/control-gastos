import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarList } from './hogar-list';

describe('HogarList', () => {
  let component: HogarList;
  let fixture: ComponentFixture<HogarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HogarList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HogarList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
