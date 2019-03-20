import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargaFacturaComponent } from './descarga-factura.component';

describe('DescargaFacturaComponent', () => {
  let component: DescargaFacturaComponent;
  let fixture: ComponentFixture<DescargaFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargaFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
