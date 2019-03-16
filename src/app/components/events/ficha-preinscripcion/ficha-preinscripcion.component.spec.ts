import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPreinscripcionComponent } from './ficha-preinscripcion.component';

describe('FichaPreinscripcionComponent', () => {
  let component: FichaPreinscripcionComponent;
  let fixture: ComponentFixture<FichaPreinscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaPreinscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaPreinscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
