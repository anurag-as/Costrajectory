import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotPointerDotUPComponent } from './dot-pointer-dot-up.component';

describe('DotPointerDotUPComponent', () => {
  let component: DotPointerDotUPComponent;
  let fixture: ComponentFixture<DotPointerDotUPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotPointerDotUPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotPointerDotUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
