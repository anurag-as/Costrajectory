import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartlineComponent } from './startline.component';

describe('StartlineComponent', () => {
  let component: StartlineComponent;
  let fixture: ComponentFixture<StartlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
