import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDescComponent } from './code-desc.component';

describe('CodeDescComponent', () => {
  let component: CodeDescComponent;
  let fixture: ComponentFixture<CodeDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
