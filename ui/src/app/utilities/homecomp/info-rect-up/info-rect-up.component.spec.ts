import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRectUpComponent } from './info-rect-up.component';

describe('InfoRectUpComponent', () => {
  let component: InfoRectUpComponent;
  let fixture: ComponentFixture<InfoRectUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRectUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRectUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
