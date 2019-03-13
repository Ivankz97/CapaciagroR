import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserCDComponent } from './list-user-c-d.component';

describe('ListUserCDComponent', () => {
  let component: ListUserCDComponent;
  let fixture: ComponentFixture<ListUserCDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserCDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserCDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
