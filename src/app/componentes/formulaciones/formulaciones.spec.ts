import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulaciones } from './formulaciones';

describe('Formulaciones', () => {
  let component: Formulaciones;
  let fixture: ComponentFixture<Formulaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formulaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
