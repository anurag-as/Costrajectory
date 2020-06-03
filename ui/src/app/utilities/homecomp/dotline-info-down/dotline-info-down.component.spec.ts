import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotlineInfoDownComponent } from './dotline-info-down.component';

describe('DotlineInfoDownComponent', () => {
  let component: DotlineInfoDownComponent;
  let fixture: ComponentFixture<DotlineInfoDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotlineInfoDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotlineInfoDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
