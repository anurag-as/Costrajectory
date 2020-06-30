import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotPointerDotDOWNComponent } from './dot-pointer-dot-down.component';

describe('DotPointerDotDOWNComponent', () => {
  let component: DotPointerDotDOWNComponent;
  let fixture: ComponentFixture<DotPointerDotDOWNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotPointerDotDOWNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotPointerDotDOWNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
