import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUserComponent } from './model-user.component';

describe('ModelUserComponent', () => {
  let component: ModelUserComponent;
  let fixture: ComponentFixture<ModelUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
