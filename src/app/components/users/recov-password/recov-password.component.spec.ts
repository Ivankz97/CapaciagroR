import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecovPasswordComponent } from './recov-password.component';

describe('RecovPasswordComponent', () => {
  let component: RecovPasswordComponent;
  let fixture: ComponentFixture<RecovPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecovPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecovPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
