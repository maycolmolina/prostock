import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoMadera } from './ingreso-madera';

describe('IngresoMadera', () => {
  let component: IngresoMadera;
  let fixture: ComponentFixture<IngresoMadera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoMadera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoMadera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
