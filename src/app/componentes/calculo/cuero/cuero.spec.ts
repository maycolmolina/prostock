import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuero } from './cuero';

describe('Cuero', () => {
  let component: Cuero;
  let fixture: ComponentFixture<Cuero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
