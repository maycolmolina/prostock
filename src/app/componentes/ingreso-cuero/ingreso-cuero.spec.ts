import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCuero } from './ingreso-cuero';

describe('IngresoCuero', () => {
  let component: IngresoCuero;
  let fixture: ComponentFixture<IngresoCuero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoCuero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoCuero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
