import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndlineComponent } from './endline.component';

describe('EndlineComponent', () => {
  let component: EndlineComponent;
  let fixture: ComponentFixture<EndlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
