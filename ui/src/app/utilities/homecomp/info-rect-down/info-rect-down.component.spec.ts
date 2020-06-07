import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRectDownComponent } from './info-rect-down.component';

describe('InfoRectDownComponent', () => {
  let component: InfoRectDownComponent;
  let fixture: ComponentFixture<InfoRectDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRectDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRectDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
