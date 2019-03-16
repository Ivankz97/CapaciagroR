import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConfirmacionPreinscripcionComponent } from './ver-confirmacion-preinscripcion.component';

describe('VerConfirmacionPreinscripcionComponent', () => {
  let component: VerConfirmacionPreinscripcionComponent;
  let fixture: ComponentFixture<VerConfirmacionPreinscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConfirmacionPreinscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConfirmacionPreinscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
