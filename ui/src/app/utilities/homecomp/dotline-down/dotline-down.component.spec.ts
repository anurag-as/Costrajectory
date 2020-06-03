import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotlineDownComponent } from './dotline-down.component';

describe('DotlineDownComponent', () => {
  let component: DotlineDownComponent;
  let fixture: ComponentFixture<DotlineDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotlineDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotlineDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
