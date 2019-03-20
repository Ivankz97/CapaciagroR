import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScomprobantePagoComponent } from './scomprobante-pago.component';

describe('ScomprobantePagoComponent', () => {
  let component: ScomprobantePagoComponent;
  let fixture: ComponentFixture<ScomprobantePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScomprobantePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScomprobantePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
