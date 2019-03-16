import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionInscripcionComponent } from './confirmacion-inscripcion.component';

describe('ConfirmacionInscripcionComponent', () => {
  let component: ConfirmacionInscripcionComponent;
  let fixture: ComponentFixture<ConfirmacionInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
