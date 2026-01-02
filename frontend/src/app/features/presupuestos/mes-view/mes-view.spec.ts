import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesView } from './mes-view';

describe('MesView', () => {
  let component: MesView;
  let fixture: ComponentFixture<MesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
