import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfichaPagosLineaComponent } from './dficha-pagos-linea.component';

describe('DfichaPagosLineaComponent', () => {
  let component: DfichaPagosLineaComponent;
  let fixture: ComponentFixture<DfichaPagosLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfichaPagosLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfichaPagosLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
