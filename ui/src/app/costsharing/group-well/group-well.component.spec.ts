import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupWellComponent } from './group-well.component';

describe('GroupWellComponent', () => {
  let component: GroupWellComponent;
  let fixture: ComponentFixture<GroupWellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupWellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupWellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
